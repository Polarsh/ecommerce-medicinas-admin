import { useNavigate } from 'react-router-dom'

const useBrandNavigate = () => {
  const navigate = useNavigate()

  const URL_BASE = '/gestion-marcas'

  const navigateToBrandMenu = () => {
    navigate(URL_BASE)
  }

  const navigateToAddBrand = () => {
    navigate(`${URL_BASE}/agregar`)
  }

  const navigateToEditBrand = brandId => {
    navigate(`${URL_BASE}/editar/${brandId}`)
  }

  const navigateToViewBrand = brandId => {
    navigate(`${URL_BASE}/ver/${brandId}`)
  }

  return {
    navigateToBrandMenu,
    navigateToAddBrand,
    navigateToEditBrand,
    navigateToViewBrand,
  }
}

export default useBrandNavigate
