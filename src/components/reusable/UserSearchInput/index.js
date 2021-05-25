import { connect } from 'react-redux';
import UserSearchInput  from './UserSearchInput';

const mapStateToProps = state => {
  return {
    usersSelect: state.usersSelect,
  }
}

export default connect(mapStateToProps)(UserSearchInput);
