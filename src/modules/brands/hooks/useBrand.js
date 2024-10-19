import { useState } from 'react'
import { toast } from 'sonner'

import { exportToExcel } from '../../../utils/exportToExcel'

import BrandService from '../services/BrandFirebase'

const useBrand = () => {
  const [brandList, setBrandList] = useState([])
  const [brand, setBrand] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getAllBrands = async () => {
    setIsLoading(true)
    try {
      const items = await BrandService.getAllBrands()
      setBrandList(items)
      setError(null)
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getBrandById = async ({ id }) => {
    setIsLoading(true)
    try {
      const item = await BrandService.getBrandById({ id })
      setBrand(item)
      setError(null)
    } catch (error) {
      setError(error.message)
      setBrand(null)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const createBrand = async ({ brandData }) => {
    brandData.createdAt = Date.now()
    brandData.updatedAt = Date.now()
    brandData.status = 'active'

    setIsLoading(true)
    try {
      await BrandService.createBrand({ brandData })
      setError(null)
      toast.success('Marca creada exitosamente')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const updateBrand = async ({ previousBrandData, newBrandData }) => {
    newBrandData.updatedAt = Date.now()
    if (!newBrandData.status) {
      newBrandData.status = previousBrandData.status
    }

    setIsLoading(true)
    try {
      await BrandService.updateBrand({
        id: newBrandData.id,
        brandData: newBrandData,
      })
      setError(null)
      toast.success('Marca actualizada exitosamente')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteBrand = async ({ id }) => {
    setIsLoading(true)
    try {
      await BrandService.deleteBrand({ id })
      setError(null)
      toast.success('Marca eliminada exitosamente')
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
        'Fecha de Creación': new Date(parseInt(row.createdAt)).toLocaleString(),
        'Última Actualización': new Date(
          parseInt(row.updatedAt)
        ).toLocaleString(),
      }))

      exportToExcel(transformedData, 'Marcas')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    }
  }

  return {
    brandList,
    brand,
    error,
    isLoading,
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
    downloadExcel,
  }
}

export default useBrand
