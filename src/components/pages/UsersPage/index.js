import { connect } from 'react-redux';
import ConfigurePage  from './Page';

const mapStateToProps = state => {
  return {
    adminUsers: state.adminUsers,
  }
}

export default connect(mapStateToProps)(ConfigurePage);
