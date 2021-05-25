import { connect } from 'react-redux'
import Footer from './Footer'

const mapStateToProps = state => {

  return {
    user: state.users,
    clearData: state.clearData
  }
}
export default connect(mapStateToProps)(Footer)
