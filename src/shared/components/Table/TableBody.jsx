import { flexRender } from '@tanstack/react-table'
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon
} from '@heroicons/react/20/solid'

export default function TableBody({ table, actionItems }) {
  const rowModel = table.getRowModel()

  const SortIcon = ({ onClick, isSorted, label }) => {
    return (
      <div onClick={onClick} className='cursor-pointer' aria-label={label}>
        {isSorted === 'asc' ? (
          <ChevronUpIcon
            aria-hidden='true'
            className={`h-5 w-5 text-purple-500`}
          />
        ) : isSorted === 'desc' ? (
          <ChevronDownIcon
            aria-hidden='true'
            className={`h-5 w-5 text-purple-500`}
          />
        ) : (
          <ChevronUpDownIcon
            aria-hidden='true'
            className='h-5 w-5 text-gray-400'
          />
        )}
      </div>
    )
  }

  return (
    <div className='flow-root'>
      <div className='overflow-x-auto -m-1 p-1'>
        <div className='inline-block min-w-full align-middle'>
          <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead className='bg-gray-50'>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => (
                      <th
                        key={header.id}
                        scope='col'
                        className={`py-3.5 ${index === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-3'} text-left text-sm font-semibold text-gray-900`}>
                        <div className='flex items-center justify-between'>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <SortIcon
                            onClick={header.column.getToggleSortingHandler()}
                            isSorted={header.column.getIsSorted()}
                            label={`Ordenar por ${header.column.columnDef.header}`}
                          />
                        </div>
                      </th>
                    ))}
                    <th
                      scope='col'
                      className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                      <span className='sr-only'>Acción</span>
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {rowModel.rows.length > 0 ? (
                  rowModel.rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell, index) => (
                        <td
                          key={cell.id}
                          className={`whitespace-nowrap py-4 text-sm ${index === 0 ? 'pl-4 pr-3 font-medium text-gray-900 sm:pl-6' : 'px-3 text-gray-500'}`}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                      <td className='relative whitespace-nowrap py-2 text-right text-sm font-medium sm:pr-6'>
                        <div className='flex space-x-2'>
                          {actionItems.map((item, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                item.action(row.original.id)
                              }}
                              className={`group flex items-center p-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 ${index > 0 ? 'hidden sm:flex' : 'flex'}`}>
                              <item.icon
                                aria-hidden='true'
                                className='h-5 w-5 text-gray-400 group-hover:text-gray-500'
                              />
                              {/* Texto visible solo en pantallas medianas y grandes */}
                              <span className='ml-2 hidden sm:inline truncate'>
                                {item.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={table.getHeaderGroups()[0].headers.length + 1}
                      className='py-4 text-center text-sm text-gray-500'>
                      {table.getPreFilteredRowModel().rows.length === 0
                        ? 'No hay datos disponibles.'
                        : 'No hay datos que concuerden con el filtro.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
