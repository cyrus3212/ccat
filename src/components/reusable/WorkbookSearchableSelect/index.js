import { connect } from 'react-redux';
import WorkbookSearchableSelect  from './WorkbookSearchableSelect';

const mapStateToProps = state => {
  return {
    workbooksSelect: state.workbooksSelect,
  }
}

export default connect(mapStateToProps)(WorkbookSearchableSelect);
