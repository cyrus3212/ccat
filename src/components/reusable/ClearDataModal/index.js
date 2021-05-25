import { connect } from 'react-redux';
import ClearDataModal from './ClearDataModal';

const mapStateToProps = state => {
  return {
    clearData: state.clearData
  };
};

export default connect(mapStateToProps)(ClearDataModal);
