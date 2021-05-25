import { connect } from 'react-redux';
import DeductionCodePage from './DeductionCodePage';

const mapStateToProps = state => {
  return {
    deductionCode: state.payrollSection,
    deductionCodeList: state.payrollSectionList
  };
};

export default connect(mapStateToProps)(DeductionCodePage);
