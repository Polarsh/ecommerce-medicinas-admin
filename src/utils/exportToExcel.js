import ExcelJS from 'exceljs'
import FileSaver from 'file-saver'
import { formatDateTime } from './functions'

export const exportToExcel = async (jsonData, name = 'data') => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet(name)

  // Añadir encabezados
  const headers = Object.keys(jsonData[0])
  worksheet.columns = headers.map(header => ({
    header,
    key: header,
  }))

  // Añadir datos
  jsonData.forEach(item => {
    worksheet.addRow(item)
  })

  // Aplicar estilos a los encabezados
  worksheet.getRow(1).eachCell(cell => {
    cell.font = { bold: true }
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCCCFF' },
    }
    cell.alignment = { horizontal: 'center' }
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }
  })

  // Ajustar el ancho de las columnas automáticamente
  worksheet.columns.forEach(column => {
    let maxLength = 0
    column.eachCell({ includeEmpty: true }, cell => {
      const columnLength = cell.value ? cell.value.toString().length : 10
      if (columnLength > maxLength) {
        maxLength = columnLength
      }
    })
    column.width = maxLength + 2
  })

  // Generar el archivo Excel y descargarlo
  const date = formatDateTime(Date.now())
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  FileSaver.saveAs(blob, `${name} - ${date}.xlsx`)
}
