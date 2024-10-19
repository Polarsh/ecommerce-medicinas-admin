import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useAdministrator from '../hooks/useAdministrator'

import AdminForm from '../components/AdminForm'

import Title from '../../../../shared/components/Title'
import FormPageSkeleton from '../../../../shared/components/Skeletons/FormPageSkeleton'
import CardComponent from '../../../../shared/components/Cards/Card'

export default function AdminEditPage() {
  const { adminId } = useParams()

  const { administrator, isLoading, error, getAdministratorById } =
    useAdministrator()

  useEffect(() => {
    getAdministratorById({ id: adminId })
  }, [])

  const initialData = administrator

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!administrator) return <div>No se encontró el administrador</div>

  return (
    <div className='space-y-6'>
      <Title
        title={'Editar administrador'}
        description={'Aqui podras editar el detalle del administrador'}
      />

      <CardComponent>
        <AdminForm initialData={initialData} />
      </CardComponent>
    </div>
  )
}
