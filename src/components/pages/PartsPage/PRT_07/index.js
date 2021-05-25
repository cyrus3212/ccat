import { connect } from 'react-redux';
import PartsDiscounts from './PartsDiscounts';

const mapStateToProps = state => {
  return {
    partsDiscount: state.partsSection,
    partsDiscountList: state.partsSectionList
  };
};

export default connect(mapStateToProps)(PartsDiscounts);
