import { connect } from 'react-redux';
import StartSetupPage from './StartSetupPage';

const mapStateToProps = state => {
  return {
    enterprises: state.enterprises,
  };
};

export default connect(mapStateToProps)(StartSetupPage);
