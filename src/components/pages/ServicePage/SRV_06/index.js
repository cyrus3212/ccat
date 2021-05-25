import { connect } from 'react-redux';
import Discounts from './Discounts';

const mapStateToProps = state => {
  return {
    discounts: state.serviceSection,
    discountsList: state.serviceSectionList
  };
};

export default connect(mapStateToProps)(Discounts);
