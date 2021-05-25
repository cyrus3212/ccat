import { connect } from 'react-redux';
import PrefixModal from './PrefixModal';

const mapStateToProps = state => {
  return {
    userStoreList: state.userStoreList,
    state: state
  }
}

export default connect(mapStateToProps)(PrefixModal);
