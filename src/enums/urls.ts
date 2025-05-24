import moment from 'moment'
import { handleErp } from '../helpers/handleErpDocuments'

const dateFrom: string = moment().subtract(1, 'day').format('YYYY-MM-DD')
const dateTo: string = moment().format('YYYY-MM-DD')
const fromYear: string = moment().startOf('year').format('YYYY-MM-DD')

export interface IRoute {
  LINK: string
  LABEL: string
  ROUTER?: string
}

export const URLS: Record<string, IRoute> = {
  HOME: {
    LINK: '/',
    LABEL: 'urls.home.label', // e.g. key for "עגלה" or "Cart"
    ROUTER: '/',
  },
  CATALOG: {
    LINK: '/',
    LABEL: 'urls.catalog.label', // e.g. "קטלוג"
    ROUTER: '/client/:documentType/:mode/:lvl1/:lvl2/:lvl3',
  },
  CATALOG_VIEW: {
    LINK: '/CatalogView',
    LABEL: 'urls.catalogView.label', // e.g. "קטגוריות"
    ROUTER: '/CatalogView',
  },
  CART: {
    LINK: '/cart',
    LABEL: 'urls.cart.label', // e.g. "עגלה"
    ROUTER: '/cart',
  },
  PROFILE: {
    LINK: '/profile',
    LABEL: 'urls.profile.label', // e.g. "פרופיל"
    ROUTER: '/profile',
  },
  DOCUMENTS: {
    LINK: `/documentPage/${handleErp()![0].value}/${dateFrom}/${dateTo}?page=1`,
    LABEL: 'urls.documents.label', // e.g. "מסמכים"
    ROUTER: '/documentPage/:documentType/:dateFrom/:dateTo',
  },
  DOCUMENT_ITEM: {
    LINK: ``,
    LABEL: 'urls.documentItem.label',
    ROUTER: '/documentItemPage/:documentItemType/:id',
  },
  DYNAMIC_TABLE_CARTESSET: {
    LINK: `/dynamic/cartesset/${dateFrom}/${dateTo}?page=1`,
    LABEL: 'urls.cartesset.label',
    ROUTER: '/dynamic/:type/:dateFrom/:dateTo',
  },
  DYNAMIC_TABLE_DEBIT: {
    LINK: `/dynamic/debit/${dateFrom}/${dateTo}?page=1`,
    LABEL: 'urls.cartesset.label',
    ROUTER: '/dynamic/:type/:dateFrom/:dateTo',
  },
  ADMIN_EDIT_CATALOG: {
    LINK: '/admin/category-edit/0/0',
    LABEL: 'urls.adminEditCatalog.label', // e.g. "ניהול קטלוג"
    ROUTER: '/admin/category-edit/:lvl1/:lvl2',
  },
  ADMIN_EDIT_HOME: {
    LINK: '/admin/homeEdit',
    LABEL: 'urls.adminEditHome.label', // e.g. "ניהול עמוד בית"
    ROUTER: '/admin/homeEdit',
  },
  ADMIN_EDIT_ATTRIBUTES: {
    LINK: '/admin/attributesEdit',
    LABEL: 'urls.adminEditAttributes.label', // e.g. "ניהול מאפיינים"
    ROUTER: '/admin/attributesEdit',
  },
  ADMIN_EDIT_ATTRIBUTE_DETAILED: {
    LINK: '/admin/attributeDetailedEdit',
    LABEL: 'urls.adminEditAttributeDetailed.label', // e.g. "ניהול מאפיינים"
    ROUTER: '/admin/attributeDetailedEdit/:id',
  },
  ADMIN_EDIT_PRODUCT: {
    LINK: '/admin/products-edit/0/0',
    LABEL: 'urls.adminEditProduct.label', // e.g. "ניהול קטלוג"
    ROUTER: '/admin/products-edit/:lvl1/:lvl2/:lvl3',
  },
  ADMIN_CLIENTS: {
    LINK: '/admin/ROLE_USER?page=1',
    LABEL: 'urls.adminClients.label', // e.g. "לקוחות"
    ROUTER: '/admin/:userRole',
  },
  ADMIN_AGENTS: {
    LINK: '/admin/ROLE_AGENT?page=1',
    LABEL: 'urls.adminAgents.label', // e.g. "סוכנים"
    ROUTER: '/admin/:userRole',
  },
  BONUSES: {
    LINK: '/admin/manage/bonuses?page=1',
    LABEL: 'urls.bonuses.label', // e.g. "בונוסים"
    ROUTER: '/admin/manage/bonuses',
  },
  BONUSES_ITEM_PAGE: {
    LINK: '/admin/manage/bonuses',
    LABEL: 'urls.bonusesItemPage.label',
    ROUTER: '/admin/manage/bonuses/:id',
  },
  ADMIN_NOTIFICATIONS: {
    LINK: '/admin/notification',
    LABEL: 'urls.adminNotifications.label', // e.g. "הודעות"
    ROUTER: '/admin/notification',
  },
  HISTORY: {
    LINK: `/documentPage/history/${dateFrom}/${dateTo}`,
    LABEL: 'urls.history.label', // e.g. "הסטוריית רכישה"
  },
  APPROVE: {
    LINK: `/documentPage/approve/${dateFrom}/${dateTo}`,
    LABEL: 'urls.approve.label', // e.g. "הזמנות לאישור"
  },
  AGENT_STATISTICS: {
    LINK: `/agentStatistics/0/${dateFrom}/${dateTo}`,
    LABEL: 'urls.agentStatistics.label', // e.g. "ביצועי סוכנים"
    ROUTER: '/agentStatistics/:tab/:dateFrom/:dateTo',
  },
  AGENT_CLIENTS: {
    LINK: '/agentClients',
    LABEL: 'urls.agentClients.label', // e.g. "לקוחות"
    ROUTER: '/agentClients/:agentId',
  },
  AGENT_DASHBOARD: {
    LINK: `/agentDashboard/0/0/${fromYear}/${dateTo}`,
    LABEL: 'urls.agentDashboard.label', // e.g. "דאשבורד"
    ROUTER: '/agentDashboard/:tab/:id/:dateFrom/:dateTo',
  },
  AGNET_DOCUMENTS: {
    LINK: `/documentPage/history/${dateFrom}/${dateTo}`,
    LABEL: 'urls.agentDocuments.label', // e.g. "מסמכים"
  },
  AGNET_DOCUMENT_AGENT: {
    LINK: '/agentDocument',
    LABEL: 'urls.agentDocumentAgent.label', // e.g. "מסמכים"
  },
  AGNET_ORDER_AGENT: {
    LINK: '/agentQuote',
    LABEL: 'urls.agentOrderAgent.label', // e.g. "טיוטות/הזמנות"
  },
  AGNET_GVIYA: {
    LINK: '/gviya',
    LABEL: 'urls.agentGviya.label', // e.g. "גביה"
  },
  AGNET_AGENT_STATISTICS: {
    LINK: '/agentStatistics',
    LABEL: 'urls.agentAgentStatistics.label', // e.g. "סטטיסטיקה"
  },
  AGENT_DOCUMENT_OFFLINE: {
    LINK: `/documentPage/offline/${dateFrom}/${dateTo}`,
    LABEL: 'urls.agentDocumentOffline.label', // e.g. "מסמכי אופליין"
  },
  CRON_MANAGER: {
    LINK: `/cron/manager`,
    LABEL: 'urls.cron.label', 
    ROUTER: '/cron/manager',
  },
}
