import { connect } from 'react-redux';
import SalesTaxGroup from './SalesTaxGroup';

const mapStateToProps = state => {
  return {
    salesTaxGroup: state.salesfiSection,
    salesTaxGroupList: state.salesfiSectionList,
  };
};

export default connect(mapStateToProps)(SalesTaxGroup);
