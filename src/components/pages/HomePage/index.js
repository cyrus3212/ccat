import { connect } from 'react-redux';
import Home from './Home';

const mapStateToProps = state => {
  return {
    isAuthenticated: !!localStorage.getItem('access_token')
  };
};

export default connect(mapStateToProps)(Home);
