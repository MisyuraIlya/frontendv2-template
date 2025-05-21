import { Routes, Route } from 'react-router-dom'
import CategoryEdit from './pages/CategoryEdit'
import ProductsEdit from './pages/ProductsEdit'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CatalogView from './pages/CatalogView'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'
import DocumentsItemPage from './pages/DocumentsItemPage'
import DocumentsPage from './pages/DocumentsPage'
import NotificationPage from './pages/NotificationPage'
import AgentClinets from './pages/AgentClinets'
import AgentDashboard from './pages/AgentDashboard'
import Users from './pages/Users'
import BottomNavigationMobile from './components/Mobile/BottomNavigationMobile'
import Header from './components/Header'
import Footer from './components/Footer'
import { URLS } from './enums/urls'
import HomeEditPage from './pages/HomeEditPage'
import { useAuthProvider } from './provider/AuthProvider'
import AgentStatistics from './pages/AgentStatistics'
import BonusesPage from './pages/BonusesPage'
import BonusItemPage from './pages/BonusItemPage'
import AttributesEditPage from './pages/AttributesEditPage'
import AttributeDetailedEditPage from './pages/AttributeDetailedEditPage'
import DynamicTablePage from './pages/DynamicTablePage'
const RouterApp = () => {
  const { isAuthrized } = useAuthProvider()

  // const location = useLocation()

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [location])

  return (
    <>
      <Header />
      <main style={{ minHeight: isAuthrized ? '90vh' : '0px' }}>
        <Routes>
          <Route>
            <Route path={URLS.HOME.ROUTER} element={<Home />} />
            <Route path={URLS.CATALOG.ROUTER} element={<Catalog />} />
            <Route path={URLS.CATALOG_VIEW.ROUTER} element={<CatalogView />} />
            <Route path={URLS.CART.ROUTER} element={<CartPage />} />
            <Route path={URLS.PROFILE.ROUTER} element={<ProfilePage />} />
            <Route path={URLS.DOCUMENTS.ROUTER} element={<DocumentsPage />} />
            <Route
              path={URLS.DOCUMENT_ITEM.ROUTER}
              element={<DocumentsItemPage />}
            />
            <Route
              path={URLS.DYNAMIC_TABLE_DEBIT.ROUTER}
              element={<DynamicTablePage />}
            />
            <Route
              path={URLS.AGENT_CLIENTS.ROUTER}
              element={<AgentClinets />}
            />
            <Route
              path={URLS.AGENT_DASHBOARD.ROUTER}
              element={<AgentDashboard />}
            />
            <Route
              path={URLS.AGENT_STATISTICS.ROUTER}
              element={<AgentStatistics />}
            />
            <Route
              path={URLS.ADMIN_EDIT_CATALOG.ROUTER}
              element={<CategoryEdit />}
            />
            <Route
              path={URLS.ADMIN_EDIT_PRODUCT.ROUTER}
              element={<ProductsEdit />}
            />
            <Route path={URLS.ADMIN_CLIENTS.ROUTER} element={<Users />} />
            <Route
              path={URLS.ADMIN_NOTIFICATIONS.ROUTER}
              element={<NotificationPage />}
            />
            <Route
              path={URLS.ADMIN_EDIT_HOME.ROUTER}
              element={<HomeEditPage />}
            />
            <Route path={URLS.BONUSES.ROUTER} element={<BonusesPage />} />
            <Route
              path={URLS.BONUSES_ITEM_PAGE.ROUTER}
              element={<BonusItemPage />}
            />
            <Route
              path={URLS.ADMIN_EDIT_ATTRIBUTES.ROUTER}
              element={<AttributesEditPage />}
            />
            <Route
              path={URLS.ADMIN_EDIT_ATTRIBUTE_DETAILED.ROUTER}
              element={<AttributeDetailedEditPage />}
            />
          </Route>
        </Routes>
      </main>
      <Footer />
      <BottomNavigationMobile />
    </>
  )
}

export default RouterApp
