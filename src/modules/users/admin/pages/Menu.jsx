import { useEffect } from 'react'
import {
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid'

import useAdministrator from '../hooks/useAdministrator'
import useAdministratorNavigate from '../hooks/useAdministratorNavigate'

import { formatDate } from '../../../../utils/functions'

import TablePageSkeleton from '../../../../shared/components/Skeletons/TablePageSkeleton'
import Title from '../../../../shared/components/Title'
import Table from '../../../../shared/components/Table/Table'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../shared/components/Button'

export default function AdminMenuPage() {
  const { navigateToAddAdmin, navigateToViewAdmin, navigateToEditAdmin } =
    useAdministratorNavigate()
  const {
    administratorList,
    isLoading,
    error,
    getAllAdministrators,
    downloadExcel,
  } = useAdministrator()

  const columns = [
    {
      header: 'Nombres',
      accessorFn: row => `${row.firstName} ${row.lastName}`,
    },
    { header: 'Email', accessorKey: 'email' },
    {
      header: 'Fecha de creación',
      accessorKey: 'createdAt',
      cell: info => formatDate(info.row.original.createdAt),
      sortingFn: 'datetime',
    },
  ]

  const actionItems = [
    {
      label: 'Ver',
      icon: EyeIcon,
      action: navigateToViewAdmin,
    },
    {
      label: 'Editar',
      icon: PencilSquareIcon,
      action: navigateToEditAdmin,
    },
  ]

  useEffect(() => {
    getAllAdministrators()
  }, [])

  if (isLoading) {
    return <TablePageSkeleton />
  }

  if (error) {
    // todo
    /* return <div>Error: {error.message}</div> */
  }

  return (
    <div className='space-y-6'>
      <Title
        title='Administradores'
        description='Una lista de todos los administradores, con su nombre, correo electrónico y rol.'
      />
      <Table data={administratorList} columns={columns}>
        <Table.Header handleExport={downloadExcel}>
          <ButtonComponent
            onClick={navigateToAddAdmin}
            label={'Añadir administrador'}
            icon={PlusCircleIcon}
            variant={ButtonStyle.Fill}
          />
        </Table.Header>
        <Table.Body
          actionItems={actionItems}
          onActionClick={navigateToViewAdmin}
        />
      </Table>
    </div>
  )
}
