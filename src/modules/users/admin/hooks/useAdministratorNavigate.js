import { useNavigate } from 'react-router-dom'

const useAdministratorNavigate = () => {
  const navigate = useNavigate()

  const URL_PATH = '/gestion-usuarios/administradores'

  const navigateToAdminMenu = () => {
    navigate(URL_PATH)
  }

  const navigateToAddAdmin = () => {
    navigate(`${URL_PATH}/agregar`)
  }

  const navigateToEditAdmin = adminId => {
    navigate(`${URL_PATH}/editar/${adminId}`)
  }

  const navigateToViewAdmin = adminId => {
    navigate(`${URL_PATH}/ver/${adminId}`)
  }

  return {
    navigateToAdminMenu,
    navigateToAddAdmin,
    navigateToEditAdmin,
    navigateToViewAdmin,
  }
}

export default useAdministratorNavigate
