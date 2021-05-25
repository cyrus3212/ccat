import { connect } from 'react-redux';
import StoreSearchableSelect  from './StoreSearchableSelect';

const mapStateToProps = state => {
  return {
    storesSelect: state.storesSelect,
  }
}

export default connect(mapStateToProps)(StoreSearchableSelect);
