// i18n配置
import { createContext, useContext, useState, ReactNode } from 'react'
import zhCN from './messages/zh-CN.json'
import en from './messages/en.json'

interface I18nContextType {
  locale: string
  setLocale: (locale: string) => void
  t: (key: string) => string
}

const messages = {
  'zh-CN': zhCN,
  'en': en,
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

interface I18nProviderProps {
  children: ReactNode
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState('zh-CN')

  const t = (key: string) => {
    const keys = key.split('.')
    let value: any = messages[locale]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key
      }
    }
    
    return value || key
  }

  const value: I18nContextType = {
    locale,
    setLocale,
    t,
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}
