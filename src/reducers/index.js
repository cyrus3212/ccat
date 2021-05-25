import { combineReducers } from 'redux';

import configUsers from './configUsersReducer';
import adminUsers from './adminUsersReducer';
import enterprises from './enterprisesReducer';
import menus from './menusReducer';
import menuSections from './menuSectionsReducer';
import users from './usersReducer';
import userWorkbookAccess from './userWorkbookAccessReducer';
// select reducer
import enterpriseCodesSelect from './selects/enterpriseCodesSelectReducer';
import storesSelect from './selects/storesSelectReducer';
import usersSelect from './selects/usersSelectReducer';
// Chart of Accounts
import chartAccounts from './chartAccounts/chartAccountsReducer';
import coaPrefix from './chartAccounts/coaPrefixReducer';
import chartAccountsList from './chartAccounts/chartAccountsListReducer';
// Accounting
import accountingSectionList from './accounting/accountingSectionListReducer';
import accountingSection from './accounting/accountingSectionReducer';
// Sales FI
import salesfiSectionList from './salesfi/salesfiSectionListReducer';
import salesfiSection from './salesfi/salesfiSectionReducer';
// Parts
import partsSectionList from './parts/partsSectionListReducer';
import partsSection from './parts/partsSectionReducer';
// Service
import serviceSectionList from './service/serviceSectionListReducer';
import serviceSection from './service/serviceSectionReducer';
// Payroll
import payrollSectionList from './payroll/payrollSectionListReducer';
import payrollSection from './payroll/payrollSectionReducer';
// Data Transaction
import dataTransaction from './dataTransactionReducer';
import batchUpdate from './batchUpdateReducer';

// Auth
import auth from './authReducer';
// Workbook
import workbooks from './workbookReducer';
import workbookSection from './workbookSectionReducer';
import completeWorkbook from './completeWorkbookReducer';
import userStoreList from './userStoresReducer';
// Clear Data
import clearData from './clearDataReducer';

export default combineReducers({

  configUsers,
  adminUsers,
  enterprises,
  menus,
  menuSections,
  users,
  userWorkbookAccess,
  workbooks,
  workbookSection,
  completeWorkbook,
  enterpriseCodesSelect,
  storesSelect,
  usersSelect,
  // Chart of Accounts
  chartAccounts,
  chartAccountsList,
  coaPrefix,
  // Accounting
  accountingSectionList,
  accountingSection,
  // Sales FI
  salesfiSectionList,
  salesfiSection,
  // Parts
  partsSectionList,
  partsSection,
  // Service
  serviceSectionList,
  serviceSection,
  // Payroll
  payrollSectionList,
  payrollSection,
  // data transaction
  dataTransaction,
  batchUpdate,
  // auth
  auth,
  userStoreList,
  clearData

});
