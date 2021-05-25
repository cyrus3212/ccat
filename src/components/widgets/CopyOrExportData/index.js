import { connect } from 'react-redux';
import CopyOrExportDataModal from './CopyOrExportDataModal';

const mapStateToProps = state => {

  return {
    enterprise: state.enterprises,
    menuSections: state.menuSections,
  }
}

export default connect(mapStateToProps)(CopyOrExportDataModal);
