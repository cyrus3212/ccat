import { connect } from 'react-redux';
import TaxWithholdingPage from './TaxWithholdingPage';

const mapStateToProps = state => {
  return {
    taxwithholding: state.payrollSection,
    taxwithholdingList: state.payrollSectionList
  };
};

export default connect(mapStateToProps)(TaxWithholdingPage);
