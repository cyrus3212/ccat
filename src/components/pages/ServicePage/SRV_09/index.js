import { connect } from 'react-redux';
import InternalPayTypes from './InternalPayTypes';

const mapStateToProps = state => {
  return {
    internalPayTypes: state.serviceSection,
    internalPayTypesList: state.serviceSectionList
  };
};

export default connect(mapStateToProps)(InternalPayTypes);
