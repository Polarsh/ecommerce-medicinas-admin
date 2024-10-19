import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../firebase/config'

import imageCompression from 'browser-image-compression'
import { v4 as uuidv4 } from 'uuid' // Para generar IDs únicos

const compressImage = async imageFile => {
  const options = {
    maxSizeMB: 1, // Tamaño máximo en MB
    maxWidthOrHeight: 1920, // Ancho o alto máximo en píxeles
    useWebWorker: true,
    fileType: 'image/webp', // Convertir a WebP
  }
  try {
    const compressedFile = await imageCompression(imageFile, options)
    return compressedFile
  } catch (error) {
    console.error('Error al comprimir la imagen:', error)
    throw error
  }
}

// Función auxiliar para normalizar el input a un array
function normalizeInput(input) {
  if (Array.isArray(input)) {
    return input
  } else {
    return [input]
  }
}

export const uploadImagesAndGetURLs = async ({ images, folder }) => {
  const normalizedImages = normalizeInput(images)

  const uploadPromises = normalizedImages.map(async image => {
    if (typeof image === 'string') {
      // Si es una URL, no se hace nada
      return image
    } else {
      // Convertir y subir el archivo a Firebase
      const compressedImage = await compressImage(image)
      const imageName = `${uuidv4()}.webp`
      const storageRef = ref(storage, `${folder}/${imageName}`)
      await uploadBytes(storageRef, compressedImage)
      const url = await getDownloadURL(storageRef)
      return url
    }
  })
  return Promise.all(uploadPromises)
}
