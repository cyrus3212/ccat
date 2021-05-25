import { connect } from 'react-redux';
import GapSources from './GapSources';

const mapStateToProps = state => {
  return {
    gapSource: state.salesfiSection,
    gapSourceList: state.salesfiSectionList,
  };
};

export default connect(mapStateToProps)(GapSources);
