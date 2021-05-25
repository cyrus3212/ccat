import { connect } from 'react-redux';
import PartKits from './PartKits';

const mapStateToProps = state => {
  return {
    partKit: state.partsSection,
    partKitList: state.partsSectionList
  };
};

export default connect(mapStateToProps)(PartKits);
