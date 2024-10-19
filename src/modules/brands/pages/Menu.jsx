import { useEffect } from 'react'
import {
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid'

import useBrand from '../hooks/useBrand'
import useBrandNavigate from '../hooks/useBrandNavigate'

import { formatDate } from '../../../utils/functions'

import TablePageSkeleton from '../../../shared/components/Skeletons/TablePageSkeleton'
import Title from '../../../shared/components/Title'
import Table from '../../../shared/components/Table/Table'
import ButtonComponent, { ButtonStyle } from '../../../shared/components/Button'

export default function BrandMenuPage() {
  const { navigateToAddBrand, navigateToViewBrand, navigateToEditBrand } =
    useBrandNavigate()
  const { brandList, isLoading, error, getAllBrands, downloadExcel } =
    useBrand()

  const columns = [
    {
      header: 'Marca',
      accessorKey: 'name',
    },
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
      action: navigateToViewBrand,
    },
    {
      label: 'Editar',
      icon: PencilSquareIcon,
      action: navigateToEditBrand,
    },
  ]

  useEffect(() => {
    getAllBrands()
  }, [])

  if (isLoading) {
    return <TablePageSkeleton />
  }

  if (error) {
    // Manejo del error (puedes personalizar este bloque según necesites)
    return <div>Error: {error.message}</div>
  }

  return (
    <div className='space-y-6'>
      <Title
        title='Marcas'
        description='Una lista de todas las marcas con su nombre y fecha de creación.'
      />
      <Table data={brandList} columns={columns}>
        <Table.Header handleExport={downloadExcel}>
          <ButtonComponent
            onClick={navigateToAddBrand}
            label={'Añadir marca'}
            icon={PlusCircleIcon}
            variant={ButtonStyle.Fill}
          />
        </Table.Header>
        <Table.Body
          actionItems={actionItems}
          onActionClick={navigateToViewBrand}
        />
      </Table>
    </div>
  )
}
