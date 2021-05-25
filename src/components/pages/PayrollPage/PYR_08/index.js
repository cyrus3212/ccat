import { connect } from 'react-redux';
import CountyCityTaxPage from './CountyCityTaxPage';

const mapStateToProps = state => {
  return {
    countyCityTax: state.payrollSection,
    countyCityTaxList: state.payrollSectionList
  };
};

export default connect(mapStateToProps)(CountyCityTaxPage);
