import { useState } from 'react'
import { toast } from 'sonner'

import { exportToExcel } from '../../../utils/exportToExcel'

import CategoryService from '../services/CategoryFirebase'

const useCategory = () => {
  const [categoryList, setCategoryList] = useState([])
  const [category, setCategory] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getAllCategories = async () => {
    setIsLoading(true)
    try {
      const items = await CategoryService.getAllCategories()
      setCategoryList(items)
      setError(null)
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getCategoryById = async ({ id }) => {
    setIsLoading(true)
    try {
      const item = await CategoryService.getCategoryById({ id })
      setCategory(item)
      setError(null)
    } catch (error) {
      setError(error.message)
      setCategory(null)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const createCategory = async ({ categoryData }) => {
    categoryData.createdAt = Date.now()
    categoryData.updatedAt = Date.now()
    categoryData.status = 'active'

    setIsLoading(true)
    try {
      await CategoryService.createCategory({ categoryData })
      setError(null)
      toast.success('Categoría creada exitosamente')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const updateCategory = async ({ previousCategoryData, newCategoryData }) => {
    newCategoryData.updatedAt = Date.now()
    if (!newCategoryData.status) {
      newCategoryData.status = previousCategoryData.status
    }

    setIsLoading(true)
    try {
      await CategoryService.updateCategory({
        id: newCategoryData.id,
        categoryData: newCategoryData,
      })
      setError(null)
      toast.success('Categoría actualizada exitosamente')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCategory = async ({ id }) => {
    setIsLoading(true)
    try {
      await CategoryService.deleteCategory({ id })
      setError(null)
      toast.success('Categoría eliminada exitosamente')
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
        Nombre: row.name,
        SubCategorias: row.subcategories.join(' | '),
        'Fecha de Creación': new Date(parseInt(row.createdAt)).toLocaleString(),
        'Última Actualización': new Date(
          parseInt(row.updatedAt)
        ).toLocaleString(),
      }))

      exportToExcel(transformedData, 'Categorías')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    }
  }

  return {
    categoryList,
    category,
    error,
    isLoading,
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    downloadExcel,
  }
}

export default useCategory
