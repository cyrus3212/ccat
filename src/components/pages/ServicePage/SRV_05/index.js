import { connect } from 'react-redux';
import Technicians from './Technicians';

const mapStateToProps = state => {
  return {
    technicians: state.serviceSection,
    techniciansList: state.serviceSectionList
  };
};

export default connect(mapStateToProps)(Technicians);
