import { connect } from 'react-redux';
import Accessories from './Accessories';

const mapStateToProps = state => {
  return {
    accessories: state.salesfiSection,
    accessoriesList: state.salesfiSectionList,
  };
};

export default connect(mapStateToProps)(Accessories);
