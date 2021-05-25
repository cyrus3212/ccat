import { connect } from 'react-redux';
import AccessTypeSelectInput  from './AccessTypeSelectInput';

const mapStateToProps = state => {
  return {
    accessTypes: state.accessTypesSelect,
  }
}

export default connect(mapStateToProps)(AccessTypeSelectInput);
