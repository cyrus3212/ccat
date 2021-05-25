import { connect } from 'react-redux';
import CustomTableHeader from './CustomTableHeader';

const mapStateToProps = state => {
  return {
    batchUpdate: state.batchUpdate,
    workbookSection: state.workbookSection
  };
};

export default connect(mapStateToProps)(CustomTableHeader);
