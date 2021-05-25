import { connect } from 'react-redux';
import Aftermarkets from './Aftermarkets';

const mapStateToProps = state => {
  return {
    aftermarket: state.salesfiSection,
    aftermarketList: state.salesfiSectionList,
  };
};

export default connect(mapStateToProps)(Aftermarkets);
