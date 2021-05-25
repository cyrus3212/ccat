import { connect } from 'react-redux';
import ReviewWorkbook from './ReviewWorkbook';

const mapStateToProps = state => {
  return {
    completionPercentage: state.completionPercentage,
  }
}

export default connect(mapStateToProps)(ReviewWorkbook);
