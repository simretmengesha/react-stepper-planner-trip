import PropTypes from 'prop-types';
import { useState } from 'react';
import Step from "./Step";
import StepNavigation from "./StepNavigation";
import StepIndicator from "./StepIndicator";
import "../styles/stepper.scss";

const Stepper = ({ steps, onComplete, onReset, packageSelected }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const goToNextStep = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    } else if (onComplete) {
      onComplete();

      onReset();

      setCurrentStep(0);
    }
  };

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isNextDisabled = isFirstStep && !packageSelected;

  return (
    <div className="stepper">
      <div className="step-ctrl">
        <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
        <StepNavigation
          onNext={goToNextStep}
          onBack={goToPreviousStep}
          isNextDisabled={isNextDisabled}
          isBackDisabled={isFirstStep}
          isLastStep={isLastStep}
        />
      </div>
      <div className="content">
        <Step content={steps[currentStep].content} />
      </div>
    </div>
  );
};

Stepper.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node.isRequired,
    })).isRequired,
    onComplete: PropTypes.func,
    onReset: PropTypes.func,
    packageSelected: PropTypes.bool.isRequired,
  };

export default Stepper;
