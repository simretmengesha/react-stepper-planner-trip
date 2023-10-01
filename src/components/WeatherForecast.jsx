import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../styles/weatherForecast.scss';

const WeatherForecast = ({ packageId, startDate, endDate }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsedCities, setCollapsedCities] = useState({});

  const apiEndpoint = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.post(`${apiEndpoint}/weather-forecast`, {
          packageId,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        });
        setWeatherData(response.data.weatherData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (packageId && startDate && endDate) {
      fetchWeatherData();
    }
  }, [packageId, startDate, endDate]);

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Filter weather data for the selected date range
  const filteredData = weatherData.map(data => {
    const forecastForDates = data.weather.forecast.forecastday.filter(day => {
      const date = new Date(day.date);
      return date >= startDate && date <= endDate;
    });
    return { ...data, weather: { ...data.weather, forecast: { forecastday: forecastForDates } } };
  });

  const toggleCityCollapse = (city) => {
    setCollapsedCities(prev => ({
      ...prev,
      [city]: !prev[city]
    }));
  };

  return (
    <div className="weather-condition-container">
      <h2>Weather Forecast</h2>
      <div  className="weather-conditions-card">
        {filteredData.length > 0 ? (
            filteredData.map((data, index) => (
                <div key={index} className="weather-conditions">
                    <h3>{data.city}, {data.country}</h3>
                    <div className="current-weather">
                        <p>Current Temperature: {data.weather.current.temp_c}°C</p>
                        <p>Current Condition: {data.weather.current.condition.text}</p>
                        <button onClick={() => toggleCityCollapse(data.city)}>
                            {!collapsedCities[data.city] ? 'Show Forcast' : 'Hide Forcast'}
                        </button>
                    </div>
                    {collapsedCities[data.city] && (
                    <div className="forcast-list">
                        <h4>Forecast:</h4>
                        <ul>
                        {data.weather.forecast.forecastday.map((day) => (
                            <li key={day.date} className="list">
                            {day.date}: {day.day.avgtemp_c}°C, {day.day.condition.text}
                            </li>
                        ))}
                        </ul>
                    </div>
                    )}
                </div>
            ))
        ) : (
            <p>No weather data available.</p>
        )}
      </div>
    </div>
  );
};

WeatherForecast.propTypes = {
  packageId: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
};

export default WeatherForecast;
