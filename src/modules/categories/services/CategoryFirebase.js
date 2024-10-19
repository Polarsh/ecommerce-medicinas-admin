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

class CategoryService {
  constructor() {
    this.collectionName = 'webs/ecommerce-medicinas/categories'
  }

  async getAllCategories() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName))
      const categories = []
      querySnapshot.forEach(doc => {
        const data = doc.data()
        if (data.status !== 'deleted') {
          categories.push({ id: doc.id, ...data })
        }
      })
      return categories
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async getCategoryById({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        if (data.status === 'deleted') {
          throw { code: 'my-error', message: 'La categoría está eliminada' }
        }
        return { id: docSnap.id, ...data }
      } else {
        throw { code: 'my-error', message: 'Categoría no encontrada' }
      }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async createCategory({ categoryData }) {
    try {
      const categoryRef = doc(collection(db, this.collectionName))
      await setDoc(categoryRef, categoryData)
      return { id: categoryRef.id, ...categoryData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async updateCategory({ id, categoryData }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists() || docSnap.data().status === 'deleted') {
        throw {
          code: 'my-error',
          message:
            'No se puede actualizar. Categoría no encontrada o eliminada.',
        }
      }
      await updateDoc(docRef, categoryData)
      return { id, ...categoryData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async deleteCategory({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists() || docSnap.data().status === 'deleted') {
        throw {
          code: 'my-error',
          message:
            'No se puede eliminar. Categoría no encontrada o ya eliminada.',
        }
      }
      await updateDoc(docRef, { status: 'deleted', updatedAt: Date.now() })
      return { id }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }
}

export default new CategoryService()
