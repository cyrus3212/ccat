import { connect } from 'react-redux';
import ListEnterprisePage from './Page';

const mapStateToProps = state => {
  return {
    enterprises: state.enterprises,
  }
}

export default connect(mapStateToProps)(ListEnterprisePage);
