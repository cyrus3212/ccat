import { connect } from 'react-redux';
import LoginPage from './LoginPage';

const mapStateToProps = state => {
  return {
    isAuthenticated: !!localStorage.getItem('access_token')
  };
};

export default connect(mapStateToProps)(LoginPage);
