import { useEffect } from 'react'
import {
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid'

import useProduct from '../hooks/useProduct'
import useProductNavigate from '../hooks/useProductNavigate'

import TablePageSkeleton from '../../../shared/components/Skeletons/TablePageSkeleton'
import Title from '../../../shared/components/Title'
import Table from '../../../shared/components/Table/Table'
import ButtonComponent, { ButtonStyle } from '../../../shared/components/Button'

export default function ProductMenuPage() {
  const { navigateToAddProduct, navigateToViewProduct, navigateToEditProduct } =
    useProductNavigate()
  const { productList, isLoading, error, getAllProducts, downloadExcel } =
    useProduct()

  console.log(productList)

  const columns = [
    {
      header: 'Producto',
      accessorKey: 'productInfo.name',
    },
    {
      header: 'Precio',
      accessorKey: 'productInfo.price',
      cell: info => `$${info.getValue()}`,
    },
    {
      header: 'Categoría',
      accessorKey: 'productInfo.category',
    },
    {
      header: 'Subcategoria',
      accessorKey: 'productInfo.subcategory',
    },
  ]

  const actionItems = [
    {
      label: 'Ver',
      icon: EyeIcon,
      action: navigateToViewProduct,
    },
    {
      label: 'Editar',
      icon: PencilSquareIcon,
      action: navigateToEditProduct,
    },
  ]

  useEffect(() => {
    getAllProducts()
  }, [])

  if (isLoading) {
    return <TablePageSkeleton />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className='space-y-6'>
      <Title
        title='Productos'
        description='Una lista de todos los productos con su nombre, precio, categoría y stock.'
      />
      <Table data={productList} columns={columns}>
        <Table.Header handleExport={downloadExcel}>
          <ButtonComponent
            onClick={navigateToAddProduct}
            label={'Añadir Producto'}
            icon={PlusCircleIcon}
            variant={ButtonStyle.Fill}
          />
        </Table.Header>
        <Table.Body
          actionItems={actionItems}
          onActionClick={navigateToViewProduct}
        />
      </Table>
    </div>
  )
}
