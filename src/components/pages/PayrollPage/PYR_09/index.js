import { connect } from 'react-redux';
import DistributionCodesPage from './DistributionCodesPage';

const mapStateToProps = state => {
  return {
    distributionCode: state.payrollSection,
    distributionCodeList: state.payrollSectionList
  };
};

export default connect(mapStateToProps)(DistributionCodesPage);
