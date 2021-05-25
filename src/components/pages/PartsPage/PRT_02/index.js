import { connect } from 'react-redux';
import PricingStrategyAssignment from './PricingStrategyAssignment';

const mapStateToProps = state => {
  return {
    pricingAssignment: state.partsSection,
    pricingAssignmentList: state.partsSectionList
  };
};

export default connect(mapStateToProps)(PricingStrategyAssignment);
