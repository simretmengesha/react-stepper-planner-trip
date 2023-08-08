import PropTypes from 'prop-types';
import StepContent from "./StepContent";

const Step = ({ content }) => (
  <div className="step">
    <StepContent content={content} />
  </div>
);

Step.propTypes = {
    content: PropTypes.node.isRequired,
};

export default Step;
