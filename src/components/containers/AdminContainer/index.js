import { connect } from 'react-redux'
import Admin       from './AdminContainer'

const mapStateToProps = state => {

  return {
    menus: state.menus,
    user: state.users
  }
}
export default connect(mapStateToProps)(Admin)
