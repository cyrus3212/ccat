import { connect } from 'react-redux';
import StateWorkersPage from './StateWorkersPage';

const mapStateToProps = state => {
  return {
    stateWorkers: state.payrollSection,
    stateWorkersList: state.payrollSectionList
  };
};

export default connect(mapStateToProps)(StateWorkersPage);
