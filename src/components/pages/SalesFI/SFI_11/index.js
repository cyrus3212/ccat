import { connect } from 'react-redux';
import FinanceCompanies from './FinanceCompanies';

const mapStateToProps = state => {
  return {
    fiCompanies: state.salesfiSection,
    fiCompaniesList: state.salesfiSectionList,
  };
};

export default connect(mapStateToProps)(FinanceCompanies);
