import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
} from 'firebase/firestore'
import { db } from '../../../../firebase/config'
import FirebaseErrorHandler from '../../../utils/FirebaseErrorHandler'
import { normalizeBrandName } from '../../../utils/normalizeName'

class BrandService {
  constructor() {
    this.collectionName = 'webs/ecommerce-medicinas/brands'
  }

  async getAllBrands() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName))
      const brands = []
      querySnapshot.forEach(doc => {
        const data = doc.data()
        if (data.status !== 'deleted') {
          brands.push({ id: doc.id, ...data })
        }
      })
      return brands
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async getBrandById({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        if (data.status === 'deleted') {
          throw { code: 'my-error', message: 'La marca está eliminada' }
        }
        return { id: docSnap.id, ...data }
      } else {
        throw { code: 'my-error', message: 'Marca no encontrada' }
      }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async createBrand({ brandData }) {
    try {
      // Normalizar el nombre de la marca para usarlo como ID
      const normalizedBrandName = normalizeBrandName(brandData.name)

      // Verificar si ya existe un documento con este ID
      const docRef = doc(db, this.collectionName, normalizedBrandName)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        throw new Error('La marca con este nombre ya existe')
      }

      // Crear el documento en Firestore con el ID normalizado
      await setDoc(docRef, brandData)
      return { id: normalizedBrandName, ...brandData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async updateBrand({ id, brandData }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists() || docSnap.data().status === 'deleted') {
        throw {
          code: 'my-error',
          message: 'No se puede actualizar. Marca no encontrada o eliminada.',
        }
      }
      await updateDoc(docRef, brandData)
      return { id, ...brandData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async deleteBrand({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists() || docSnap.data().status === 'deleted') {
        throw {
          code: 'my-error',
          message: 'No se puede eliminar. Marca no encontrada o ya eliminada.',
        }
      }
      await updateDoc(docRef, { status: 'deleted', updatedAt: Date.now() })
      return { id }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }
}

export default new BrandService()
