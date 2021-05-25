import { connect } from 'react-redux';
import FilterSearchableSelect  from './FilterSearchableSelect';

const mapStateToProps = state => {
  return {
    storesSelect: state.storesSelect,
  }
}

export default connect(mapStateToProps)(FilterSearchableSelect);
