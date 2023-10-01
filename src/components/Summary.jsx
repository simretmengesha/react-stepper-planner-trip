import PropTypes from 'prop-types';
import '../styles/summary.scss';

const SummaryStep = ({ selectedPackage, travelDates }) => {
  if (!selectedPackage) {
    return <p>No package selected.</p>;
  }

  return (
    <div className="summary">
      <h2 className="summary-title">Summary</h2>
      <p className="summary-description">This is the summary of your trip</p>
      <div className="package-details">
        <img src={selectedPackage.country.image_url} alt={selectedPackage.country.name} className="country-image" />
        <h3 className="package-name">{selectedPackage.name}</h3>
        <p>{selectedPackage.description}</p>
        <p><strong>Duration:</strong> {selectedPackage.duration} days</p>
        <p><strong>Price:</strong> ${selectedPackage.price}</p>
        <p><strong>Travel Dates:</strong> {travelDates.startDate.toLocaleDateString()} - {travelDates.endDate.toLocaleDateString()}</p>
      </div>
      <div className="country-details">
        <h3>Country: {selectedPackage.country.name}</h3>
        <p><strong>Capital:</strong> {selectedPackage.country.capital}</p>
        <p><strong>Continent:</strong> {selectedPackage.country.continent}</p>
        <p><strong>Currency:</strong> {selectedPackage.country.currency}</p>
        <p><strong>Languages:</strong> {selectedPackage.country.languages.join(', ')}</p>
      </div>
      <div className="destinations">
        <h3>Destinations</h3>
        {selectedPackage.destinations.map(destination => (
          <div key={destination._id} className="destination">
            <h4>{destination.name}</h4>
            <p>{destination.description}</p>
            <p><strong>City:</strong> {destination.location.city}</p>
            <p><strong>Tags:</strong> {destination.tags.join(', ')}</p>
            <img src={destination.image_url} alt={destination.name} className="destination-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

SummaryStep.propTypes = {
  selectedPackage: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    destinations: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        location: PropTypes.shape({
          city: PropTypes.string.isRequired,
          country: PropTypes.string.isRequired,
          coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
        }).isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        image_url: PropTypes.string.isRequired,
      })
    ).isRequired,
    country: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      capital: PropTypes.string.isRequired,
      continent: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      languages: PropTypes.arrayOf(PropTypes.string).isRequired,
      image_url: PropTypes.string.isRequired,
    }).isRequired,
  }),
  travelDates: PropTypes.shape({
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

export default SummaryStep;
