// Chart of Accounts
import ChartAccounts from '../components/pages/ChartAccounts/CHR_01';

// Accounting
import BankAccount from '../components/pages/Accounting/ACN_01';
import GeneralDepartment from '../components/pages/Accounting/ACN_02';
import TaxGroup from '../components/pages/Accounting/ACN_03';
import CashDrawers from '../components/pages/Accounting/ACN_04';
import PaymentMethod from '../components/pages/Accounting/ACN_05';
import PurchaseOrder from '../components/pages/Accounting/ACN_06';
import CashReceipt from '../components/pages/Accounting/ACN_07';
import ARCustomer from '../components/pages/Accounting/ACN_08';
import AccountPayable from '../components/pages/Accounting/ACN_09';
import ManagedAccounts from '../components/pages/Accounting/ACN_10';
import SplitAccounts from '../components/pages/Accounting/ACN_11';
import VehicleInventory from '../components/pages/Accounting/ACN_12';
import OptionalFields from '../components/pages/Accounting/ACN_13';

// Sales FI
import AccountAssignments from '../components/pages/SalesFI/SFI_01';
import SalesGroups from '../components/pages/SalesFI/SFI_02';
import InsuranceSources from '../components/pages/SalesFI/SFI_03';
import GapSources from '../components/pages/SalesFI/SFI_04';
import Aftermarkets from '../components/pages/SalesFI/SFI_05';
import SalesDeptEmployees from '../components/pages/SalesFI/SFI_10';
import FinanceCompanies from '../components/pages/SalesFI/SFI_11';
import SFIServiceContracts from '../components/pages/SalesFI/SFI_06';
import Accessories from '../components/pages/SalesFI/SFI_07';
import LendingFeesLeasing from '../components/pages/SalesFI/SFI_08';
import SalesTaxGroup from '../components/pages/SalesFI/SFI_09';

// Parts
import PricingStrategies from '../components/pages/PartsPage/PRT_01';
import PricingStrategyAssignment from '../components/pages/PartsPage/PRT_02';
import Manufacturers from '../components/pages/PartsPage/PRT_03';
import StockingGroups from '../components/pages/PartsPage/PRT_04';
import Counterpersons from '../components/pages/PartsPage/PRT_05';
import RestockingCharge from '../components/pages/PartsPage/PRT_06';
import PartsDiscounts from '../components/pages/PartsPage/PRT_07';
import PartFees from '../components/pages/PartsPage/PRT_08';
import PartKits from '../components/pages/PartsPage/PRT_09';
import SpecialOrder from '../components/pages/PartsPage/PRT_10';

// Payroll
import FederalTax from '../components/pages/PayrollPage/PYR_01';
import GeneralSetup from '../components/pages/PayrollPage/PYR_02';
import RetirementSetup from '../components/pages/PayrollPage/PYR_03';
import DepartmentCodes from '../components/pages/PayrollPage/PYR_04';
import TaxWithholding from '../components/pages/PayrollPage/PYR_05';
import StateWithholdingTax from '../components/pages/PayrollPage/PYR_06';
import StateWorkers from '../components/pages/PayrollPage/PYR_07';
import CountyCityTax from '../components/pages/PayrollPage/PYR_08';
import DistributionCodes from '../components/pages/PayrollPage/PYR_09';
import PayCodeOverride from '../components/pages/PayrollPage/PYR_10';
import OtherPayCodes from '../components/pages/PayrollPage/PYR_11';
import DeductionCode from '../components/pages/PayrollPage/PYR_12';

// Service
import ServiceTypes from '../components/pages/ServicePage/SRV_01';
import ServiceContracts from '../components/pages/ServicePage/SRV_02';
import ServicePricing from '../components/pages/ServicePage/SRV_03';
import ServiceWriters from '../components/pages/ServicePage/SRV_04';
import Technicians from '../components/pages/ServicePage/SRV_05';
import Discounts from '../components/pages/ServicePage/SRV_06';
import ServiceFees from '../components/pages/ServicePage/SRV_07';
import PolicyAdjustment from '../components/pages/ServicePage/SRV_08';
import InternalPayTypes from '../components/pages/ServicePage/SRV_09';

export function getComponentByCode(component) {
  const sectionComponents = {
    // Chart of Accounts
    "CHR_01": ChartAccounts,

    // Accounting
    "ACN_01": BankAccount,
    "ACN_02": GeneralDepartment,
    "ACN_03": TaxGroup,
    "ACN_04": CashDrawers,
    "ACN_05": PaymentMethod,
    "ACN_06": PurchaseOrder,
    "ACN_07": CashReceipt,
    "ACN_08": ARCustomer,
    "ACN_09": AccountPayable,
    "ACN_10": ManagedAccounts,
    "ACN_11": SplitAccounts,
    "ACN_12": VehicleInventory,
    "ACN_13": OptionalFields,

    // Sales FI
    "SFI_01": AccountAssignments,
    "SFI_02": SalesGroups,
    "SFI_03": InsuranceSources,
    "SFI_04": GapSources,
    "SFI_05": Aftermarkets,
    "SFI_06": SFIServiceContracts,
    "SFI_07": Accessories,
    "SFI_08": LendingFeesLeasing,
    "SFI_09": SalesTaxGroup,
    "SFI_10": SalesDeptEmployees,
    "SFI_11": FinanceCompanies,

    // Parts
    "PRT_01": PricingStrategies,
    "PRT_02": PricingStrategyAssignment,
    "PRT_03": Manufacturers,
    "PRT_04": StockingGroups,
    "PRT_05": Counterpersons,
    "PRT_06": RestockingCharge,
    "PRT_07": PartsDiscounts,
    "PRT_08": PartFees,
    "PRT_09": PartKits,
    "PRT_10": SpecialOrder,

    // Service
    "SRV_01": ServiceTypes,
    "SRV_02": ServiceContracts,
    "SRV_03": ServicePricing,
    "SRV_04": ServiceWriters,
    "SRV_05": Technicians,
    "SRV_06": Discounts,
    "SRV_07": ServiceFees,
    "SRV_08": PolicyAdjustment,
    "SRV_09": InternalPayTypes,

    // Payroll
    "PYR_01": FederalTax,
    "PYR_02": GeneralSetup,
    "PYR_03": RetirementSetup,
    "PYR_04": DepartmentCodes,
    "PYR_05": TaxWithholding,
    "PYR_06": StateWithholdingTax,
    "PYR_07": StateWorkers,
    "PYR_08": CountyCityTax,
    "PYR_09": DistributionCodes,
    "PYR_10": PayCodeOverride,
    "PYR_11": OtherPayCodes,
    "PYR_12": DeductionCode,
  }

  return sectionComponents[component];
}
