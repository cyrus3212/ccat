import { connect } from 'react-redux';
import SalesGroups from './SalesGroups';

const mapStateToProps = state => {
  return {
    salesGroups: state.salesfiSection,
    salesGroupsList: state.salesfiSectionList,
  };
};

export default connect(mapStateToProps)(SalesGroups);
