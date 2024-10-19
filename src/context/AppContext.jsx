import { createContext, useContext, useState } from 'react'
import { Toaster } from 'sonner'

export const appContext = createContext()

export const useApp = () => {
  const context = useContext(appContext)
  return context
}

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <appContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}>
      {children}
      <Toaster richColors position='top-right' />
    </appContext.Provider>
  )
}
