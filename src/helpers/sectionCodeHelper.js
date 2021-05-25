export function getSectionCode(name) {
  const sectionCode = {
    // Chart of Accounts
    "ChartAccounts": "CHR_01",

    // Accounting
    "BankAccount"       : "ACN_01",
    "GeneralDepartment" : "ACN_02",
    "TaxGroup"          : "ACN_03",
    "CashDrawers"       : "ACN_04",
    "PaymentMethod"     : "ACN_05",
    "PurchaseOrder"     : "ACN_06",
    "CashReceipt"       : "ACN_07",
    "ARCustomer"        : "ACN_08",
    "APVendorTypes"     : "ACN_09",
    "ManagedAccounts"   : "ACN_10",
    "SplitAccounts"     : "ACN_11",
    "VehicleInventory"  : "ACN_12",
    "OptionalFields"    : "ACN_13",

    // Sales FI
    "AccountAssignments"    : "SFI_01",
    "SalesGroups"           : "SFI_02",
    "InsuranceSources"      : "SFI_03",
    "GapSources"            : "SFI_04",
    "Aftermarkets"          : "SFI_05",
    "SalesServiceContracts" : "SFI_06",
    "Accessories"           : "SFI_07",
    "LendingFeesLeasing"    : "SFI_08",
    "SalesTaxGroup"         : "SFI_09",
    "SalesDeptEmployees"    : "SFI_10",
    "FinanceCompanies"      : "SFI_11",

    // Parts
    "PricingStrategies"         : "PRT_01",
    "PricingStrategyAssignment" : "PRT_02",
    "Manufacturers"             : "PRT_04",
    "StockingGroups"            : "PRT_03",
    "Counterpersons"            : "PRT_05",
    "RestockingCharge"          : "PRT_06",
    "PartsDiscounts"            : "PRT_07",
    "PartsFees"                 : "PRT_08",
    "PartKits"                  : "PRT_09",
    "SpecialOrder"              : "PRT_10",

    // Service
    "ServiceTypes"     : "SRV_01",
    "ServiceContracts" : "SRV_02",
    "ServicePricing"   : "SRV_03",
    "ServiceWriters"   : "SRV_04",
    "Technicians"      : "SRV_05",
    "Discounts"        : "SRV_06",
    "ServiceFees"      : "SRV_07",
    "PolicyAdjustment" : "SRV_08",
    "InternalPayTypes" : "SRV_09",

    // Payroll
    "FederalTax"       : "PYR_01",
    "GeneralSetup"     : "PYR_02",
    "RetirementSetup"  : "PYR_03",
    "DepartmentCodes"  : "PYR_04",
    "TaxWithholding"   : "PYR_05",
    "StateWithholdingTax": "PYR_06",
    "StateWorkers"     : "PYR_07",
    "CountyCityTax"    : "PYR_08",
    "DistributionCodes": "PYR_09",
    "PayCodeOverride"  : "PYR_10",
    "OtherPayCodes"    : "PYR_11",
    "DeductionCode"    : "PYR_12",
  };

  return sectionCode[name];
}

export function getLastSection(code) {
  const sectionCode = {
    // Chart of Accounts
    "CHR"  : "ChartAccounts",
    // Accounting
    "ACN"  : "OptionalFields",
    // Sales FI
    "SFI"  : "FinanceCompanies",
    // Parts
    "PRT"  : "SpecialOrder",
    // Service
    "SRV"  : "InternalPayTypes",
    // Payroll
    "PYR"  : "CountyCityTax"
  };

  return sectionCode[code];
}
