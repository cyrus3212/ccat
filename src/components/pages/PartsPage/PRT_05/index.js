import { connect } from 'react-redux';
import Counterpersons from './Counterpersons';

const mapStateToProps = state => {
  return {
    counterperson: state.partsSection,
    counterpersonList: state.partsSectionList
  };
};

export default connect(mapStateToProps)(Counterpersons);
