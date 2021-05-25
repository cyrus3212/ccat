import { connect } from 'react-redux';
import ConfigurePage  from './Page';

const mapStateToProps = state => {
  return {
    configUsers: state.configUsers,
    workbookAccessSelect: state.workbookAccessSelect,
  }
}

export default connect(mapStateToProps)(ConfigurePage);
