import { connect } from 'react-redux';
import SpecialOrder from './SpecialOrder';

const mapStateToProps = state => {
  return {
    specialOrder: state.partsSection,
    specialOrderList: state.partsSectionList
  };
};

export default connect(mapStateToProps)(SpecialOrder);
