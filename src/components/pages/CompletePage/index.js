import { connect } from 'react-redux';
import CompletePage  from './CompletePage';

const mapStateToProps = state => {
  return {
    sections: state.workbooks,
  }
}

export default connect(mapStateToProps)(CompletePage);
