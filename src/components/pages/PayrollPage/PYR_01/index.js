import { connect } from 'react-redux';
import FederalTaxPage from './FederalTaxPage';

const mapStateToProps = state => {
  return {
    federalTax: state.payrollSection,
    federalTaxList: state.payrollSectionList
  };
};

export default connect(mapStateToProps)(FederalTaxPage);
