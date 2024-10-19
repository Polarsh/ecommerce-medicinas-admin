import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthProvider'

import ProtectedRoute from './routes/ProtectedRoute'

import PageLayout from './layout/PageLayout'

import LoginPage from './pages/Login'
import DashboardPage from './pages/Dashboard'
import DefaultPage from './pages/Default'

import AdminMenuPage from './modules/users/admin/pages/Menu'
import AdminAddPage from './modules/users/admin/pages/Add'
import AdminEditPage from './modules/users/admin/pages/Edit'
import AdminViewPage from './modules/users/admin/pages/View'

import CategoryMenuPage from './modules/categories/pages/Menu'
import CategoryAddPage from './modules/categories/pages/Add'
import CategoryEditPage from './modules/categories/pages/Edit'
import CategoryViewPage from './modules/categories/pages/View'

import BrandMenuPage from './modules/brands/pages/Menu'
import BrandAddPage from './modules/brands/pages/Add'
import BrandEditPage from './modules/brands/pages/Edit'
import BrandViewPage from './modules/brands/pages/View'

import ProductMenuPage from './modules/products/pages/Menu'
import ProductAddPage from './modules/products/pages/Add'
import ProductEditPage from './modules/products/pages/Edit'
import ProductViewPage from './modules/products/pages/View'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path='/iniciar-sesion' element={<LoginPage />} />
          <Route element={<ProtectedRoute redirectPath={'/iniciar-sesion'} />}>
            <Route path='/' element={<PageLayout />}>
              <Route index element={<Navigate to='/dashboard' />} />
              <Route path='dashboard' element={<DashboardPage />} />
              {/* Usuarios */}
              <Route path='gestion-usuarios'>
                <Route path='administradores'>
                  <Route index element={<AdminMenuPage />} />
                  <Route path='agregar' element={<AdminAddPage />} />
                  <Route path='editar/:adminId' element={<AdminEditPage />} />
                  <Route path='ver/:adminId' element={<AdminViewPage />} />
                </Route>
                {/* <Route path='usuarios'>
                  <Route index element={<AdminMenuPage />} />
                  <Route path='agregar' element={<AdminAddPage />} />
                  <Route path='editar/:adminId' element={<AdminEditPage />} />
                  <Route path='ver/:adminId' element={<AdminViewPage />} />
                </Route> */}
              </Route>
              {/* Categoria */}
              <Route path='gestion-categorias'>
                <Route index element={<CategoryMenuPage />} />
                <Route path='agregar' element={<CategoryAddPage />} />
                <Route
                  path='editar/:categoryId'
                  element={<CategoryEditPage />}
                />
                <Route path='ver/:categoryId' element={<CategoryViewPage />} />
              </Route>
              {/* Marca */}
              <Route path='gestion-marcas'>
                <Route index element={<BrandMenuPage />} />
                <Route path='agregar' element={<BrandAddPage />} />
                <Route path='editar/:brandId' element={<BrandEditPage />} />
                <Route path='ver/:brandId' element={<BrandViewPage />} />
              </Route>
              {/* Products */}
              <Route path='gestion-inventario'>
                <Route index element={<ProductMenuPage />} />
                <Route path='agregar' element={<ProductAddPage />} />
                <Route path='editar/:productId' element={<ProductEditPage />} />
                <Route path='ver/:productId' element={<ProductViewPage />} />
              </Route>
              {/* Logs */}
              {/* <Route path='registro-actividades'>
                <Route index element={<LogsMenuPage />} />
                <Route path='ver/:logId' element={<ViewLogPage />} />
              </Route> */}
              <Route path='*' element={<DefaultPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </AppProvider>
  )
}
