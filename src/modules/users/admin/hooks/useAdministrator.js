import { useState } from 'react'
import { toast } from 'sonner'
import AdminService from '../services/AdminFirebase'
import { exportToExcel } from '../../../../utils/exportToExcel'

const useAdministrator = () => {
  const [administratorList, setAdministratorList] = useState([])
  const [administrator, setAdministrator] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getAllAdministrators = async () => {
    setIsLoading(true)
    try {
      const items = await AdminService.getAllAdministrators()
      setAdministratorList(items)
      setError(null)
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getAdministratorById = async ({ id }) => {
    setIsLoading(true)
    try {
      const item = await AdminService.getAdministratorById({ id })
      setAdministrator(item)
      setError(null)
    } catch (error) {
      setError(error.message)
      setAdministrator(null)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const createAdministrator = async ({ adminData }) => {
    adminData.createdAt = Date.now()
    adminData.updatedAt = Date.now()
    adminData.status = 'active'

    setIsLoading(true)
    try {
      await AdminService.createAdministrator({ adminData })
      setError(null)
      toast.success('Administrador creado exitosamente')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const updateAdministrator = async ({ previousAdminData, newAdminData }) => {
    newAdminData.updatedAt = Date.now()
    if (!newAdminData.status) {
      newAdminData.status = previousAdminData.status
    }

    setIsLoading(true)
    try {
      await AdminService.updateAdministrator({
        id: newAdminData.id,
        adminData: newAdminData,
      })
      setError(null)
      toast.success('Administrador actualizado exitosamente')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAdministrator = async ({ id }) => {
    setIsLoading(true)
    try {
      await AdminService.deleteAdministrator({ id })
      setError(null)
      toast.success('Administrador eliminado exitosamente')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadExcel = async json => {
    try {
      const transformedData = json.map(row => ({
        Nombre: `${row.firstName} ${row.lastName}`,
        Email: row.email,
        DNI: row.dni,
        Teléfono: row.phone,
        'Fecha de Creación': new Date(parseInt(row.createdAt)).toLocaleString(),
        'Última Actualización': new Date(
          parseInt(row.updatedAt)
        ).toLocaleString(),
      }))

      exportToExcel(transformedData, 'Administradores')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    }
  }

  return {
    administratorList,
    administrator,
    error,
    isLoading,
    getAllAdministrators,
    getAdministratorById,
    createAdministrator,
    updateAdministrator,
    deleteAdministrator,
    downloadExcel,
  }
}

export default useAdministrator
