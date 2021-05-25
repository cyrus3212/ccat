import { connect } from 'react-redux';
import SectionSearchableSelect  from './SectionSearchableSelect';

const mapStateToProps = state => {
  return {
    workbooksSelect: state.workbooksSelect,
  }
}

export default connect(mapStateToProps)(SectionSearchableSelect);
