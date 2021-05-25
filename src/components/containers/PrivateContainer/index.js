import { connect } from 'react-redux'
import Private from './PrivateContainer'

const mapStateToProps = state => {

  return {
    menus: state.menus,
    enterprise: state.enterprises,
    userWorkbookAccess: state.userWorkbookAccess,
    menuSections: state.menuSections,
    user: state.users,
    workbookSection: state.workbookSection
  }
}
export default connect(mapStateToProps)(Private)
