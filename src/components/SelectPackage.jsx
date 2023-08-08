import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "../styles/package.scss";

const SelectPackage = ({ apiEndpoint, onSelectionChange }) => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setPackages(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [apiEndpoint]);

  const handleSelect = (packageItem) => {
    setSelectedPackage(packageItem);
    onSelectionChange(packageItem);
  };

  if (loading) {
    return <p>Loading packages...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="package-selector">
      <h2>Select Package</h2>
      <ul className="package-list">
        {packages.map((packageItem) => (
          <li key={packageItem._id} className="package">
            <label>
              <input
                type="radio"
                id={packageItem._id}
                name="packages"
                checked={selectedPackage?._id === packageItem._id}
                onChange={() => handleSelect(packageItem)}
              />
              {packageItem.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

SelectPackage.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
};

export default SelectPackage;
