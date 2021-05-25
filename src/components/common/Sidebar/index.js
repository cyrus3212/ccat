import { connect } from 'react-redux'
import Sidebar from './Sidebar'

const mapStateToProps = state => {

  return {
    menuSections: state.menuSections
  }
}
export default connect(mapStateToProps)(Sidebar)

