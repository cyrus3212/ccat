import chartOfAccountsSVG from './svg/chartsOfAccounts.svg';
import accountingSVG from './svg/accounting.svg';
import salesFandISVG from './svg/salesFandI.svg';
import partsSVG from './svg/parts.svg';
import serviceSVG from './svg/service.svg';
import payrollSVG from './svg/payroll.svg';
import downloadSVG from './svg/download.svg';
import importSVG from './svg/import.svg';
import exportSVG from './svg/export.svg';
// Success Icons
import cChartOfAccountsSVG from './svg/chartsOfAccounts_compete.svg';
import cAccountingSVG from './svg/accounting_complete.svg';
import cSalesFandISVG from './svg/salesFI_complete.svg';
import cPartsSVG from './svg/parts_complete.svg';
import cServiceSVG from './svg/services_complete.svg';
import cPayrollSVG from './svg/payroll_complete.svg';

export function iconType(icon, label) {

  const iconType = {
    'CHR'   : { icon: chartOfAccountsSVG  , label : (label !== undefined && label !== '') ? label : 'Chart Of Accounts' },
    'ACN'   : { icon: accountingSVG       , label : (label !== undefined && label !== '') ? label : 'Accounting'        },
    'SFI'   : { icon: salesFandISVG       , label : (label !== undefined && label !== '') ? label : 'Sales / F&I'       },
    'PRT'   : { icon: partsSVG            , label : (label !== undefined && label !== '') ? label : 'Parts'             },
    'SRV'   : { icon: serviceSVG          , label : (label !== undefined && label !== '') ? label : 'Service'           },
    'PYR'   : { icon: payrollSVG          , label : (label !== undefined && label !== '') ? label : 'Payroll '          },
    'DL'    : { icon: downloadSVG         , label : (label !== undefined && label !== '') ? label : 'Download'          },
    'IP'    : { icon: importSVG           , label : (label !== undefined && label !== '') ? label : 'Import'            },
    'EP'    : { icon: exportSVG           , label : (label !== undefined && label !== '') ? label : 'Export'            },
    'CHR_C' : { icon: cChartOfAccountsSVG , label : (label !== undefined && label !== '') ? label : 'Chart Of Account'  },
    'ACN_C' : { icon: cAccountingSVG      , label : (label !== undefined && label !== '') ? label : 'Accounting'        },
    'SFI_C' : { icon: cSalesFandISVG      , label : (label !== undefined && label !== '') ? label : 'Sales / F&I'       },
    'PRT_C' : { icon: cPartsSVG           , label : (label !== undefined && label !== '') ? label : 'Parts'             },
    'SRV_C' : { icon: cServiceSVG         , label : (label !== undefined && label !== '') ? label : 'Service'           },
    'PYR_C' : { icon: cPayrollSVG         , label : (label !== undefined && label !== '') ? label : 'Payroll'           },
  }

  return iconType[icon];
}
