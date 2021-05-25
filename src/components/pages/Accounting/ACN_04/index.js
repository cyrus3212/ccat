import { connect } from 'react-redux';
import CashDrawers from './CashDrawers';

const mapStateToProps = state => {
  return {
    cashDrawerList: state.accountingSectionList,
    cashDrawer: state.accountingSection,
  };
};

export default connect(mapStateToProps)(CashDrawers);
