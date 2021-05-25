import { connect } from 'react-redux';
import ServiceWriters from './ServiceWriters';

const mapStateToProps = state => {
  return {
    serviceWriters: state.serviceSection,
    serviceWritersList: state.serviceSectionList
  };
};

export default connect(mapStateToProps)(ServiceWriters);
