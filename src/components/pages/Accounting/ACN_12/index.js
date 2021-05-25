import { connect } from 'react-redux';
import VehicleInventory from './VehicleInventory';

const mapStateToProps = state => {
  return {
    vehicleInventory: state.accountingSection,
    vehicleInventoryList: state.accountingSectionList
  };
};

export default connect(mapStateToProps)(VehicleInventory);
