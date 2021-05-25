import { connect } from 'react-redux';
import StockingGroups from './StockingGroups';

const mapStateToProps = state => {
  return {
    stockingGroup: state.partsSection,
    stockingGroupList: state.partsSectionList
  };
};

export default connect(mapStateToProps)(StockingGroups);
