import React from 'react'
import { Box, Container } from '@mui/material'
import Home from '../components/Home'
import hooks from '../hooks'
import useSWR from 'swr'
import services from '../services'
import { useAuthProvider } from '../provider/AuthProvider'
import { useMobile } from '../provider/MobileProvider'
import { useTranslation } from 'react-i18next'

const fetchData = async () => {
  return await services.Admin.AdminHomeEditService.getHomeEdits()
}

const HomePage = () => {
  const { t } = useTranslation()
  const { isAuthrized } = useAuthProvider()
  const { isMobile } = useMobile()
  const { data: specialCatalog, isLoading: specialLoading } =
    hooks.useDataCatalog('', 'special')

  const { data: newCatalog, isLoading: newLoading } = hooks.useDataCatalog(
    '',
    'new'
  )

  const { data } = useSWR('api/homeEdit', () => fetchData(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  })

  return (
    <Box>
      {data?.map((element) => {
        if (element.type === 'main') {
          if (element.isVideo && element.isActive) {
            return (
              <Home.Video
                key={element.id}
                isVideo={true}
                src={element?.homeMedia?.[0]?.mediaObject?.contentUrl}
              />
            )
          }

          if (element.isBanner && element.isActive && !isMobile) {
            return (
              <Home.Video
                key={element.id}
                isVideo={false}
                src={
                  element?.homeMedia
                    ?.filter(
                      (item) =>
                        item?.mediaObject?.filePath &&
                        item.device === (isMobile ? 'mobile' : 'desktop')
                    )
                    .map((item) => item.mediaObject.filePath) || []
                }
              />
            )
          }

          if (element.isBanner && element.isActive && isMobile) {
            return (
              <Home.Video
                key={element.id}
                isVideo={false}
                src={
                  element?.homeMedia
                    ?.filter(
                      (item) =>
                        item?.mediaObject?.filePath &&
                        item.device === (isMobile ? 'mobile' : 'desktop')
                    )
                    .map((item) => item.mediaObject.filePath) || []
                }
              />
            )
          }
        }
        return (
          <Container
            key={element.id}
            maxWidth="xl"
            sx={{ marginBottom: isAuthrized ? '50px' : '0px' }}
          >
            {isAuthrized && (
              <>
                {settings?.homePageAllCategoriesComponent ? (
                  <>
                    {element.type === 'categories' && element.isActive && (
                      <Box sx={{ marginTop: '50px' }}>
                        <Home.AllCategories />
                      </Box>
                    )}
                  </>
                ) : (
                  <>
                    {element.type === 'categories' && element.isActive && (
                      <Box sx={{ marginTop: '50px' }}>
                        <Home.Categories
                          toShow={element.count}
                          toShowMobile={element.countMobile}
                        />
                      </Box>
                    )}
                  </>
                )}

                {element.type === 'productsNew' && element.isActive && (
                  <Box>
                    {specialCatalog?.data && (
                      <Home.Products
                        title={t('homePage.newProducts')}
                        array={specialCatalog?.data}
                        toShow={element.count}
                        toShowInMobile={element.countMobile}
                        column={1}
                        link="/client/new/1/0/0?page=1"
                        loading={specialLoading}
                      />
                    )}
                  </Box>
                )}
                {element.type === 'productsSale' && element.isActive && (
                  <Box sx={{ marginTop: '60px' }}>
                    {newCatalog?.data && (
                      <Home.Products
                        title={t('homePage.specialProducts')}
                        array={newCatalog?.data}
                        toShow={element.count}
                        toShowInMobile={element.countMobile}
                        column={1}
                        link="/client/special/1/0/0?page=1"
                        loading={newLoading}
                      />
                    )}
                  </Box>
                )}
              </>
            )}
          </Container>
        )
      })}
    </Box>
  )
}

export default HomePage
