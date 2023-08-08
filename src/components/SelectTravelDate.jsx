import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/dateSelector.scss';

const SelectTravelDate = ({ duration, onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (startDate && duration) {
      // Calculate end date only when startDate or duration changes
      const calculatedEndDate = new Date(startDate);
      calculatedEndDate.setDate(calculatedEndDate.getDate() + duration);

      // Update endDate only if it's different from the calculated one
      if (!endDate || endDate.getTime() !== calculatedEndDate.getTime()) {
        setEndDate(calculatedEndDate);
        onDateChange({ startDate, endDate: calculatedEndDate });
      }
    }
  }, [startDate, duration, endDate, onDateChange]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  return (
    <div className="date-selector-container">
      <h2>Select Travel Dates</h2>
      <div className="date-selector">
        <label>
          Start Date:
        </label>
        <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select a start date"
        />
      </div>
      {endDate && (
        <div className="date-selector">
          <label>
            End Date:
          </label>
          {endDate.toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

SelectTravelDate.propTypes = {
  duration: PropTypes.number.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default SelectTravelDate;
