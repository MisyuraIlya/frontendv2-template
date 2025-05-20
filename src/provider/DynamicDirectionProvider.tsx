import React, { FC, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'

const DynamicDirectionProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { i18n } = useTranslation()
  const lang = i18n.language || 'he'
  const dir = lang === 'he' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.dir = dir
    document.body.dir = dir
  }, [dir])

  const cache = useMemo(
    () =>
      createCache({
        key: dir === 'rtl' ? 'mui-rtl' : 'mui-ltr',
        stylisPlugins: dir === 'rtl' ? [prefixer, rtlPlugin] : [],
      }),
    [dir]
  )

  return (
    <CacheProvider key={dir} value={cache}>
      {children}
    </CacheProvider>
  )
}

export default DynamicDirectionProvider
