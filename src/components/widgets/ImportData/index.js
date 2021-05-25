import { connect } from 'react-redux';
import ImportDataModal from './ImportDataModal';

const mapStateToProps = state => {

  return {
    enterprise: state.enterprises,
    menuSections: state.menuSections,
  }
}

export default connect(mapStateToProps)(ImportDataModal);
