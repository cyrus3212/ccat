import { connect } from 'react-redux'
import Header from './Header'

const mapStateToProps = state => {

  return {
    enterprise: state.enterprises,
    storesSelect: state.storesSelect,
    user: state.users
  }
}
export default connect(mapStateToProps)(Header)
