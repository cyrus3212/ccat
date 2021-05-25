import { connect } from 'react-redux';
import Manufacturers from './Manufacturers';

const mapStateToProps = state => {
  return {
    manufacturer: state.partsSection,
    manufacturerList: state.partsSectionList,
  };
};

export default connect(mapStateToProps)(Manufacturers);
