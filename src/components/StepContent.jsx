// StepContent.js
import PropTypes from 'prop-types';

const StepContent = ({ content }) => <div className="step-content">{content}</div>;

StepContent.propTypes = {
    content: PropTypes.node.isRequired,
};

export default StepContent;
