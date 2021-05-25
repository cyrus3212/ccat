import { connect } from 'react-redux';
import PricingStrategies from './PricingStrategies';

const mapStateToProps = state => {
  return {
    pricing: state.partsSection,
    pricingList: state.partsSectionList,
  };
};

export default connect(mapStateToProps)(PricingStrategies);
