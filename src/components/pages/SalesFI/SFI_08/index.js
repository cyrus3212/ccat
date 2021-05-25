import { connect } from 'react-redux';
import LendingFeesLeasing from './LendingFeesLeasing';

const mapStateToProps = state => {
  return {
    lending: state.salesfiSection,
    lendingList: state.salesfiSectionList,
  };
};

export default connect(mapStateToProps)(LendingFeesLeasing);
