import { connect } from 'react-redux';
import WorkbooksPage  from './WorkbooksPage';

const mapStateToProps = state => {
  return {
    workbooks: state.workbooks,
  }
}

export default connect(mapStateToProps)(WorkbooksPage);
