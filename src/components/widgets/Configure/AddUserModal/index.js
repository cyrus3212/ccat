import { connect } from 'react-redux';
import AddUserModal from './AddUserModal';

const mapStateToProps = state => {
  return {
    usersSelect: state.usersSelect,
  }
}

export default connect(mapStateToProps)(AddUserModal);
