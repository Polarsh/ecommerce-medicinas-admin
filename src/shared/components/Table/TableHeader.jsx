import { CiSearch } from 'react-icons/ci'
import { TiExport } from 'react-icons/ti'

import ButtonComponent, { ButtonStyle } from '../Button'

export default function TableHeader({
  children,
  table,
  filtering,
  setFiltering,
  handleExport,
}) {
  const onExportClick = () => {
    const jsonData = table.getFilteredRowModel().rows.map(row => row.original)
    handleExport(jsonData)
  }

  return (
    <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
      <div className='flex flex-wrap items-center gap-4 flex-grow'>
        <ButtonComponent
          onClick={() => {
            onExportClick()
          }}
          disabled={table.getFilteredRowModel().rows.length === 0}
          label={'Exportar CSV'}
          icon={TiExport}
          variant={ButtonStyle.Outline}
        />
        {children}
      </div>
      <div className='relative w-full sm:w-1/4 min-w-64'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <CiSearch className='h-5 w-5 text-gray-400' aria-hidden='true' />
        </div>
        <input
          type='text'
          placeholder='Buscar...'
          value={filtering}
          onChange={e => setFiltering(e.target.value)}
          className='block w-full rounded-md border-0 py-1.5 pl-10 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
        />
      </div>
    </div>
  )
}
