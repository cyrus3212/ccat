import { connect } from 'react-redux';
import StateWithholdingTaxPage from './StateWithholdingTaxPage';

const mapStateToProps = state => {
  return {
    stateWithholdingTax: state.payrollSection,
    stateWithholdingTaxList: state.payrollSectionList
  };
};

export default connect(mapStateToProps)(StateWithholdingTaxPage);
