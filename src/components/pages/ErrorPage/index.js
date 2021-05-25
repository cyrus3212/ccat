import { connect } from 'react-redux';
import ErrorPage from './ErrorPage';

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(ErrorPage);
