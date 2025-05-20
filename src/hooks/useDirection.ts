import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

const useDirection = (): 'ltr' | 'rtl' => {
  const { i18n } = useTranslation()
  return useMemo(
    () => (i18n.language === 'en' ? 'ltr' : 'rtl'),
    [i18n.language]
  )
}

export default useDirection
