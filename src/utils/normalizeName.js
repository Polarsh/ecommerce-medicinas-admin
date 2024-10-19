// Función para normalizar el nombre
export const normalizeBrandName = name => {
  return name
    .toLowerCase() // Convertir a minúsculas
    .normalize('NFD') // Descomponer caracteres Unicode (para eliminar tildes)
    .replace(/[\u0300-\u036f]/g, '') // Eliminar tildes
    .replace(/\s+/g, '-') // Convertir espacios a guiones
    .replace(/[^a-z0-9-]/g, '') // Eliminar caracteres que no sean alfanuméricos o guiones
}
