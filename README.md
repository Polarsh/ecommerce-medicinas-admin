# Farmacia Online - Admin Panel

Este proyecto es el **Panel de Administración** para gestionar una **farmacia online**, desarrollado con **React**, **Vite**, **Tailwind CSS** y **Firebase**. El panel permite a los administradores realizar operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar) sobre los productos farmacéuticos, gestionar imágenes y datos, así como administrar usuarios autenticados.

Puedes acceder al panel de administración en la siguiente URL:  
[**Farmacia Online - Admin Panel**](https://farmacia-online-admin-dybsm98.web.app/)

## Pruebas

Puedes usar las siguientes credenciales de prueba para ingresar a la aplicación:

```
Email: prueba@dybsm98.com
Password: prueba
```

## Características Principales

- **CRUD de Productos**: Gestión completa de productos farmacéuticos, permitiendo la creación, edición, eliminación y visualización de productos almacenados en **Firestore**.
- **Almacenamiento de Imágenes**: Integración con **Firebase Storage** para subir, almacenar y gestionar las imágenes de los productos.
- **Autenticación de Administradores**: Solo administradores autenticados mediante **Firebase Auth** pueden acceder y gestionar el panel.
- **Exportación a CSV**: Exporta la lista de productos y otros datos relevantes a un archivo **CSV** para su análisis y gestión externa.
- **Validación de Formularios**: Los formularios cuentan con validación robusta utilizando **React Hook Form** y **Yup**, asegurando la entrada correcta de datos.
- **Notificaciones Interactivas**: Sistema de notificaciones y alertas en tiempo real implementado con **Sonner**, proporcionando una experiencia fluida al administrador.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para la creación de interfaces de usuario dinámicas e interactivas.
- **Vite**: Herramienta de desarrollo rápida y optimizada para proyectos frontend.
- **Tailwind CSS**: Framework de CSS que facilita la creación de diseños responsivos y modernos.
- **Firebase**:
  - **Firestore**: Base de datos NoSQL para gestionar los productos de la farmacia online.
  - **Firebase Storage**: Almacenamiento escalable y seguro para las imágenes de los productos.
  - **Firebase Auth**: Autenticación para administrar el acceso de usuarios al panel de control.
  - **Firebase Hosting**: Despliegue rápido y seguro del panel de administración en la nube.

## Funcionalidades Adicionales

- **Exportación a CSV**: Funcionalidad que permite exportar el inventario de productos farmacéuticos y otros datos en formato CSV para una gestión eficiente.
- **Validación de Formularios con Yup**: Validación de todos los formularios con **React Hook Form** y **Yup** para asegurar la entrada de datos precisa y segura.
- **Notificaciones con Sonner**: **Sonner** se utiliza para mostrar notificaciones y alertas interactivas que mejoran la experiencia de administración con retroalimentación en tiempo real.
