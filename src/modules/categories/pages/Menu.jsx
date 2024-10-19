import { useEffect } from 'react'
import {
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid'

import useCategory from '../hooks/useCategory'
import useCategoryNavigate from '../hooks/useCategoryNavigate'
/* import { formatDate } from '../../../utils/functions'
 */ import TablePageSkeleton from '../../../shared/components/Skeletons/TablePageSkeleton'
import Title from '../../../shared/components/Title'
import Table from '../../../shared/components/Table/Table'
import ButtonComponent, { ButtonStyle } from '../../../shared/components/Button'

export default function CategoryMenuPage() {
  const {
    navigateToAddCategory,
    navigateToViewCategory,
    navigateToEditCategory,
  } = useCategoryNavigate()
  const { categoryList, isLoading, error, getAllCategories, downloadExcel } =
    useCategory()

  const columns = [
    {
      header: 'Categoría',
      accessorKey: 'name',
    },
    /* {
      header: '# Subcategorías',
      accessorFn: row => (row.subcategories ? row.subcategories.length : 0),
    }, */
    {
      header: 'SubCategorias',
      accessorFn: row =>
        row.subcategories ? row.subcategories.join(' | ') : 0,
    },
    /* {
      header: 'Fecha de creación',
      accessorKey: 'createdAt',
      cell: info => formatDate(info.row.original.createdAt),
      sortingFn: 'datetime',
    }, */
  ]

  const actionItems = [
    {
      label: 'Ver',
      icon: EyeIcon,
      action: navigateToViewCategory,
    },
    {
      label: 'Editar',
      icon: PencilSquareIcon,
      action: navigateToEditCategory,
    },
  ]

  useEffect(() => {
    getAllCategories()
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
        title='Categorías'
        description='Una lista de todas las categorías con su nombre, número de subcategorías, y fecha de creación.'
      />
      <Table data={categoryList} columns={columns}>
        <Table.Header handleExport={downloadExcel}>
          <ButtonComponent
            onClick={navigateToAddCategory}
            label={'Añadir categoría'}
            icon={PlusCircleIcon}
            variant={ButtonStyle.Fill}
          />
        </Table.Header>
        <Table.Body
          actionItems={actionItems}
          onActionClick={navigateToViewCategory}
        />
      </Table>
    </div>
  )
}
