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

class ProductService {
  constructor() {
    this.collectionName = 'webs/ecommerce-medicinas/products'
  }

  // Crear una referencia de documento sin guardar
  createProductRef() {
    return doc(collection(db, 'webs/ecommerce-medicinas/products'))
  }

  async getAllProducts() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName))
      const products = []
      querySnapshot.forEach(doc => {
        const data = doc.data()
        if (data.status !== 'deleted') {
          products.push({ id: doc.id, ...data })
        }
      })
      return products
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async getProductById({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        if (data.status === 'deleted') {
          throw { code: 'my-error', message: 'El producto está eliminado' }
        }
        return { id: docSnap.id, ...data }
      } else {
        throw { code: 'my-error', message: 'Producto no encontrado' }
      }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async createProduct({ productId, productData }) {
    try {
      const productRef = doc(db, this.collectionName, productId)
      await setDoc(productRef, productData)
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async updateProduct({ id, productData }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists() || docSnap.data().status === 'deleted') {
        throw {
          code: 'my-error',
          message:
            'No se puede actualizar. Producto no encontrado o eliminado.',
        }
      }
      await updateDoc(docRef, productData)
      return { id, ...productData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async deleteProduct({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists() || docSnap.data().status === 'deleted') {
        throw {
          code: 'my-error',
          message:
            'No se puede eliminar. Producto no encontrado o ya eliminado.',
        }
      }
      await updateDoc(docRef, { status: 'deleted', updatedAt: Date.now() })
      return { id }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }
}

export default new ProductService()
