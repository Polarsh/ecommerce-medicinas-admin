import { useNavigate } from 'react-router-dom'

const useProductNavigate = () => {
  const navigate = useNavigate()

  const URL_BASE = '/gestion-inventario'

  const navigateToProductMenu = () => {
    navigate(URL_BASE)
  }

  const navigateToAddProduct = () => {
    navigate(`${URL_BASE}/agregar`)
  }

  const navigateToEditProduct = productId => {
    navigate(`${URL_BASE}/editar/${productId}`)
  }

  const navigateToViewProduct = productId => {
    navigate(`${URL_BASE}/ver/${productId}`)
  }

  return {
    navigateToProductMenu,
    navigateToAddProduct,
    navigateToEditProduct,
    navigateToViewProduct,
  }
}

export default useProductNavigate
