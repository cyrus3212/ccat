import { connect } from 'react-redux';
import ServicePricing from './ServicePricing';

const mapStateToProps = state => {
  return {
    servicePricing: state.serviceSection,
    servicePricingList: state.serviceSectionList
  };
};

export default connect(mapStateToProps)(ServicePricing);
