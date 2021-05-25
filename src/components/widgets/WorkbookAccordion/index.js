import { connect } from 'react-redux'
import WorkbookAccordion from './WorkbookAccordion'

const mapStateToProps = state => {

  return {
    menus: state.menus
  }
}
export default connect(mapStateToProps)(WorkbookAccordion)
