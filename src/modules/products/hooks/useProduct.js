import { useState } from 'react'
import { toast } from 'sonner'

import { exportToExcel } from '../../../utils/exportToExcel'
import ProductService from '../services/ProductFirebase'
import { uploadImagesAndGetURLs } from '../../../utils/uploadImages'

const useProduct = () => {
  const [productList, setProductList] = useState([])
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getAllProducts = async () => {
    setIsLoading(true)
    try {
      const items = await ProductService.getAllProducts()
      setProductList(items)
      setError(null)
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getProductById = async ({ id }) => {
    setIsLoading(true)
    try {
      const item = await ProductService.getProductById({ id })
      setProduct(item)
      setError(null)
    } catch (error) {
      setError(error.message)
      setProduct(null)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const createProduct = async ({ productData }) => {
    productData.createdAt = Date.now()
    productData.updatedAt = Date.now()
    productData.status = 'active'

    setIsLoading(true)
    try {
      // Generar un ID automático de Firebase Firestore
      const productRef = ProductService.createProductRef() // Crea una referencia de documento sin guardar
      const productId = productRef.id

      const folderName = productId

      // Subir imágenes y obtener sus URLs
      const imageUrls = await uploadImagesAndGetURLs({
        images: productData.images,
        folder: `ecommerce-medicinas/productImages/${folderName}`,
      })

      // Crear el objeto de datos del producto con las URLs de las imágenes
      const newData = { ...productData, images: imageUrls, id: productId }

      // Guardar el producto en Firestore usando el ID generado
      await ProductService.createProduct({ productId, productData: newData })

      setError(null)
      toast.success('Producto creado exitosamente')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const updateProduct = async ({ previousProductData, newProductData }) => {
    newProductData.updatedAt = Date.now()
    if (!newProductData.status) {
      newProductData.status = previousProductData.status
    }

    setIsLoading(true)
    try {
      const folderName = newProductData.id

      // Subir imágenes y obtener sus URLs
      const imageUrls = await uploadImagesAndGetURLs({
        images: newProductData.images,
        folder: `ecommerce-medicinas/productImages/${folderName}`,
      })

      // Crear el objeto de datos del producto con las URLs de las imágenes
      const newData = { ...newProductData, images: imageUrls }

      // Guardar el producto en Firestore usando el ID generado
      await ProductService.updateProduct({
        id: newProductData.id,
        productData: newData,
      })
      setError(null)
      toast.success('Producto actualizado exitosamente')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProduct = async ({ id }) => {
    setIsLoading(true)
    try {
      await ProductService.deleteProduct({ id })
      setError(null)
      toast.success('Producto eliminado exitosamente')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadExcel = async json => {
    try {
      const transformedData = json.map(row => ({
        Nombre: row.productInfo.name,
        Precio: `S/.${row.productInfo.price}`,
        Marca: row.productInfo.brand,
        Categoría: row.productInfo.category,
        Subcategoría: row.productInfo.subcategory,
        Cantidad: row.productInfo.presentationAmount,
        'Tipo de Presentación': row.productInfo.presentationType,
        'Forma de Administración': row.productInfo.administrationRoute,
        'Requiere Receta Médica': row.productInfo.requiresPrescription
          ? 'Sí'
          : 'No',
        'Visibilidad en la página': row.productInfo.isVisible
          ? 'Visible'
          : 'Oculto',
        Descripción: row.productInfo.description,
        'Fecha de Creación': new Date(parseInt(row.createdAt)).toLocaleString(),
        'Última Actualización': new Date(
          parseInt(row.updatedAt)
        ).toLocaleString(),
      }))

      exportToExcel(transformedData, 'Productos')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    }
  }

  return {
    productList,
    product,
    error,
    isLoading,
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    downloadExcel,
  }
}

export default useProduct
