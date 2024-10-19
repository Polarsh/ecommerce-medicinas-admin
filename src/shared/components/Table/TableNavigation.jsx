import ButtonComponent, { ButtonStyle } from '../Button'

export default function TableNavigation({ table }) {
  return (
    <nav aria-label='Pagination' className='flex items-center justify-between'>
      <select
        className='block rounded-md border-0 py-1.5 pl-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6'
        value={table.getState().pagination.pageSize}
        onChange={e => {
          table.setPageSize(Number(e.target.value))
        }}>
        {[10, 20, 30].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Mostrar {pageSize}
          </option>
        ))}
      </select>

      <div className='hidden sm:block ml-3'>
        <p className='text-sm text-gray-700'>
          Mostrando{' '}
          <span className='font-medium'>
            {Math.min(
              table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1,
              table.getFilteredRowModel().rows.length
            )}
          </span>{' '}
          a{' '}
          <span className='font-medium'>
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}
          </span>{' '}
          de{' '}
          <span className='font-medium'>
            {table.getFilteredRowModel().rows.length}
          </span>{' '}
          resultados
        </p>
      </div>
      <div className='flex flex-1 justify-between sm:justify-end gap-3'>
        <ButtonComponent
          onClick={() => table.previousPage()}
          label={'Anterior'}
          disabled={!table.getCanPreviousPage()}
          variant={ButtonStyle.Text}
        />
        <ButtonComponent
          onClick={() => table.nextPage()}
          label={'Siguiente'}
          disabled={!table.getCanNextPage()}
          variant={ButtonStyle.Text}
        />
      </div>
    </nav>
  )
}
