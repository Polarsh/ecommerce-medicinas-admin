class FirebaseErrorHandler extends Error {
  constructor(error) {
    super()
    this.name = 'FirebaseErrorHandler'
    this.message = this.getFirebaseErrorMessage(error)
  }

  getFirebaseErrorMessage(error) {
    if (!error || !error.code) {
      return 'Ocurrió un error desconocido.'
    }

    if (error.code === 'my-error') {
      return error.message
    }

    switch (error.code) {
      case 'permission-denied':
        return 'No tienes permisos para realizar esta acción.'
      case 'not-found':
        return 'El documento solicitado no fue encontrado.'
      case 'already-exists':
        return 'El documento ya existe.'
      case 'invalid-argument':
        return 'Se proporcionó un argumento inválido.'
      case 'deadline-exceeded':
        return 'El tiempo de espera para la operación ha expirado.'
      case 'unavailable':
        return 'El servicio no está disponible actualmente.'
      case 'unauthenticated':
        return 'No estás autenticado. Por favor, inicia sesión y vuelve a intentarlo.'
      case 'resource-exhausted':
        return 'Los recursos se han agotado. Por favor, inténtalo más tarde.'
      case 'failed-precondition':
        return 'La operación no se puede realizar en el estado actual.'
      case 'aborted':
        return 'La operación fue abortada.'
      case 'out-of-range':
        return 'El valor proporcionado está fuera del rango permitido.'
      case 'unimplemented':
        return 'La operación no está implementada.'
      case 'internal':
        return 'Ocurrió un error interno.'
      case 'data-loss':
        return 'Ocurrió una pérdida de datos.'
      default:
        return `Error desconocido: ${error.message}`
    }
  }
}

export default FirebaseErrorHandler
