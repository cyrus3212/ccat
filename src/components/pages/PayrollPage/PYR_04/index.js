import { connect } from 'react-redux';
import DepartmentCodePage from './DepartmentCodePage';

const mapStateToProps = state => {
  return {
    departmentCode: state.payrollSection,
    departmentCodeList: state.payrollSectionList
  };
};

export default connect(mapStateToProps)(DepartmentCodePage);
