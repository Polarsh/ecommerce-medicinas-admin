// Convertir timestamp unix a fecha
export const formatDate = timestamp => {
  const numericTimestamp =
    typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp

  const date = new Date(numericTimestamp)

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Convertir timestamp unix a fecha con hora, minuto y segundo
export const formatDateTime = timestamp => {
  const numericTimestamp =
    typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp

  const date = new Date(numericTimestamp)

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

export const formatToCurrency = amount => {
  if (typeof amount === 'number') {
    amount = amount.toString()
  }

  if (!amount) return ''
  const number = parseInt(amount.replace(/[^0-9-]+/g, ''), 10)
  if (isNaN(number)) return ''
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

export const formatToKilometers = distance => {
  if (typeof distance === 'number') {
    distance = distance.toString()
  }

  if (!distance) return ''
  const number = parseInt(distance.replace(/[^0-9-]+/g, ''), 10)
  if (isNaN(number)) return ''
  return number.toLocaleString('en-US')
}

export const removeAccentsAndSpaces = str => {
  return str
    .normalize('NFD') // Descompone caracteres acentuados en caracteres base + acento
    .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
    .replace(/\s+/g, '') // Elimina espacios
    .toLowerCase() // Convierte a minúsculas
}
