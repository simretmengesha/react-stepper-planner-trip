
import { useState } from 'react';
import Stepper from './components/Stepper.jsx';
import Layout from './components/layout/layout.jsx';
import SelectPackage from './components/SelectPackage.jsx';
import SelectTravelDate from './components/SelectTravelDate.jsx';
import WeatherForecast from './components/WeatherForecast.jsx';
import Summary from './components/Summary.jsx';

function App() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [travelDates, setTravelDates] = useState({ startDate: null, endDate: null });

  const apiEndpoint = import.meta.env.VITE_REACT_APP_API_URL;

  const handlePackageSelection = (newSelection) => {
    setSelectedPackage(newSelection);
  }

  const handleDateChange = ({ startDate, endDate }) => {
    setTravelDates({ startDate, endDate });
  };

  const handleComplete = () => {
    alert("Your trip has been booked!");
  };

  const handleResetStepper = () => {
    setSelectedPackage(null);
    setTravelDates({ startDate: null, endDate: null });
  };

  const steps = [
    {
      title: "Select Destination Package",
      content: (
        <SelectPackage
          apiEndpoint={`${apiEndpoint}/tripPackages`}
          onSelectionChange={handlePackageSelection}
        />
      ),
    },
    { title: "Select Travel Dates",
      content: (
        <SelectTravelDate 
          duration={selectedPackage ? selectedPackage.duration : 0}
          onDateChange={handleDateChange} />
      ),
    },
    {
      title: "Weather Forecast",
      content: (
        <WeatherForecast
          packageId={selectedPackage ? selectedPackage?._id : ''}
          startDate={travelDates.startDate}
          endDate={travelDates.endDate} />
      ),
    },
    { title: "Summary", 
      content: (
        <Summary 
          selectedPackage ={selectedPackage}
          travelDates={travelDates} />
      ),
    },
  ];

  return (
    <div>
      <Layout>
        <Stepper steps={steps} packageSelected={Boolean(selectedPackage)} onComplete={handleComplete} onReset={handleResetStepper}/>
      </Layout>
    </div>
  )
}

export default App
