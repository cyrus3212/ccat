import { connect } from 'react-redux';
import PartFees from './PartFees';

const mapStateToProps = state => {
  return {
    partFees: state.partsSection,
    partFeesList: state.partsSectionList
  };
};

export default connect(mapStateToProps)(PartFees);
