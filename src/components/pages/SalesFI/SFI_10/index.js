import { connect } from 'react-redux';
import SalesDeptEmployees from './SalesDeptEmployees';

const mapStateToProps = state => {
  return {
    salesDeptEmp: state.salesfiSection,
    salesDeptEmpList: state.salesfiSectionList,
  };
};

export default connect(mapStateToProps)(SalesDeptEmployees);
