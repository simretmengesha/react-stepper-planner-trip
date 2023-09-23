// StepIndicator.js
import PropTypes from 'prop-types';
import '../styles/indicator.scss';

const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="indicator">
    Step {currentStep + 1} of {totalSteps}
  </div>
);

StepIndicator.propTypes = {
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
};

export default StepIndicator;
