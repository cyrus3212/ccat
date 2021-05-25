import { connect } from 'react-redux';
import Page from './Page';

const mapStateToProps = state => {
  return {
    dataTransaction: state.dataTransaction,
  };
};

export default connect(mapStateToProps)(Page);
