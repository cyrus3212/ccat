import { connect } from 'react-redux';
import CompanySearchInput  from './CompanySearchInput';

const mapStateToProps = state => {
  return {
    storesSelect: state.storesSelect,
  }
}

export default connect(mapStateToProps)(CompanySearchInput);
