import { useNavigate } from 'react-router-dom'

const useCategoryNavigate = () => {
  const navigate = useNavigate()

  const URL_BASE = '/gestion-categorias'

  const navigateToCategoryMenu = () => {
    navigate(URL_BASE)
  }

  const navigateToAddCategory = () => {
    navigate(`${URL_BASE}/agregar`)
  }

  const navigateToEditCategory = categoryId => {
    navigate(`${URL_BASE}/editar/${categoryId}`)
  }

  const navigateToViewCategory = categoryId => {
    navigate(`${URL_BASE}/ver/${categoryId}`)
  }

  return {
    navigateToCategoryMenu,
    navigateToAddCategory,
    navigateToEditCategory,
    navigateToViewCategory,
  }
}

export default useCategoryNavigate
