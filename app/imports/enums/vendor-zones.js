import {Enum} from 'enumify'

// ====================================================================
class Vendor_Zones extends Enum {}
Vendor_Zones.initEnum({
  HOME: {
    url: 'home',
    label: 'Home Base',
    icon_code: '\f015'
  },
  FILES: {
    url: 'files',
    label: 'Files',
    icon_code: '\f015'
  },
  SCHOOLS: {
    url: 'schools',
    label: 'Schools',
    icon_code: '\f015'
  },
  SITTINGS: {
    url: 'sittings',
    label: 'Sittings',
    icon_code: '\f015'
  },
  PRINTING_AGREEMENTS: {
    url: 'printing-agreements',
    label: 'Printing Agreements',
    icon_code: '\f015'
  },
  RETOUCHING_AGREEMENTS: {
    url: 'retouching-agreements',
    label: 'Retouching Agreements',
    icon_code: '\f015'
  },
  DASHBOARD: {
    url: 'dashboard',
    label: 'Dashboard',
    icon_code: '\f015'
  },
  ACCOUNT: {
    url: 'account',
    label: 'Account',
    icon_code: '\f015'
  },
  ORDERS: {
    url: 'orders',
    label: 'Orders',
    icon_code: '\f015'
  },
  TRANSACTIONS: {
    url: 'transactions',
    label: 'Transactions',
    icon_code: '\f015'
  },
  NOTIFICATIONS: {
    url: 'notifications',
    label: 'Notifications',
    icon_code: '\f015'
  },
})
// ====================================================================

export { Vendor_Zones }
