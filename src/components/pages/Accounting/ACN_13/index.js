import { connect } from 'react-redux';
import OptionalFields from './OptionalFields';

const mapStateToProps = state => {
  return {
    optionalFields: state.accountingSection,
    optionalFieldsList: state.accountingSectionList
  };
};

export default connect(mapStateToProps)(OptionalFields);
