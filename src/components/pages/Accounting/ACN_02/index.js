import { connect } from 'react-redux';
import GeneralDepartment from './GeneralDepartment';

const mapStateToProps = state => {
  return {
    generalDepartment: state.accountingSection,
    generalDepartmentList: state.accountingSectionList
  };
};

export default connect(mapStateToProps)(GeneralDepartment);
