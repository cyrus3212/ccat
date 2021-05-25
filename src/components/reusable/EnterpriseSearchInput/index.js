import { connect } from 'react-redux';
import EnterpriseSearchInput  from './EnterpriseSearchInput';

const mapStateToProps = state => {
  return {
    enterpriseCodesSelect: state.enterpriseCodesSelect,
  }
}

export default connect(mapStateToProps)(EnterpriseSearchInput);
