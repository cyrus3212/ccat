import { connect } from 'react-redux';
import TaxGroup from './TaxGroup';

const mapStateToProps = state => {
  return {
    taxGroup: state.accountingSection,
    taxGroupList: state.accountingSectionList
  };
};

export default connect(mapStateToProps)(TaxGroup);
