import PropTypes from 'prop-types';
import "../styles/navigation.scss";

const StepNavigation = ({ onNext, onBack, isNextDisabled, isBackDisabled, isLastStep }) => {
  const nextButtonClass = `btn ${isNextDisabled ? 'btn-disabled' : 'btn-active'} ${isLastStep ? 'btn-finish' : ''}`;

  return (
    <div className="navigation">
      <button onClick={onBack} disabled={isBackDisabled} className="btn btn-back">
        Back
      </button>
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={nextButtonClass}
      >
        {isLastStep ? "Confirm" : "Next"}
      </button>
    </div>
  );
};

StepNavigation.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
  isBackDisabled: PropTypes.bool.isRequired,
  isLastStep: PropTypes.bool.isRequired,
};

export default StepNavigation;
