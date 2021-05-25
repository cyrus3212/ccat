import { connect } from 'react-redux';
import ReviewPage  from './ReviewPage';

const mapStateToProps = state => {
  return {
    sections: state.workbooks,
    workbook: state.completeWorkbook,
  }
}

export default connect(mapStateToProps)(ReviewPage);
