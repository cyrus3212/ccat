import { connect } from 'react-redux';
import EnterpriseDetailPage from './DetailForm';

const mapStateToProps = state => {

  return {
    enterprise: state.enterprises,
    dataTransaction: state.dataTransaction,
  }
}

export default connect(mapStateToProps)(EnterpriseDetailPage);
