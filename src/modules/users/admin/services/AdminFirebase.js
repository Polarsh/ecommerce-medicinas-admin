import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
} from 'firebase/firestore'

import { db } from '../../../../../firebase/config'
import { initializeSecondaryApp } from '../../../../../firebase/secondaryConfig'
import FirebaseErrorHandler from '../../../../utils/FirebaseErrorHandler'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { deleteApp } from 'firebase/app'

class AdminService {
  constructor() {
    this.collectionName =
      'webs/ecommerce-medicinas/users/user-types/administrators'
  }

  async getAllAdministrators() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName))
      const admins = []
      querySnapshot.forEach(doc => {
        const data = doc.data()
        if (data.status !== 'deleted') {
          admins.push({ id: doc.id, ...data })
        }
      })

      return admins
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async getAdministratorById({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        if (data.status === 'deleted') {
          throw {
            code: 'my-error',
            message: 'El administrador está eliminado',
          }
        }
        return { id: docSnap.id, ...data }
      } else {
        throw { code: 'my-error', message: 'Administrador no encontrado' }
      }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async createAdministrator({ adminData }) {
    const { secondaryApp, secondaryAuth } = initializeSecondaryApp()

    try {
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        adminData.email,
        adminData.dni
      )
      const user = userCredential.user
      adminData.id = user.uid
      await setDoc(doc(db, this.collectionName, user.uid), adminData)
      await secondaryAuth.signOut()
      deleteApp(secondaryApp)

      return { adminData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async updateAdministrator({ id, adminData }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists() || docSnap.data().status === 'deleted') {
        throw {
          code: 'my-error',
          message:
            'No se puede actualizar. Administrador no encontrado o eliminado.',
        }
      }
      await updateDoc(docRef, adminData)
      return { id, ...adminData }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }

  async deleteAdministrator({ id }) {
    try {
      const docRef = doc(db, this.collectionName, id)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists() || docSnap.data().status === 'deleted') {
        throw {
          code: 'my-error',
          message:
            'No se puede eliminar. Administrador no encontrado o ya eliminado.',
        }
      }
      await updateDoc(docRef, { status: 'deleted', updatedAt: Date.now() })
      return { id }
    } catch (error) {
      throw new FirebaseErrorHandler(error)
    }
  }
}

export default new AdminService()
