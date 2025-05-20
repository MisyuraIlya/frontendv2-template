import React from 'react'
import { Container } from '@mui/material'
import Profile from '../components/Profile'
import Utils from '../utils'
import { useOffline } from '../provider/OfflineProvider'
import { useTranslation } from 'react-i18next'

const ProfilePage = () => {
  const { isOnline } = useOffline()
  const { t } = useTranslation()
  return (
    <Container maxWidth="xl" sx={{ marginTop: '50px' }}>
      <Utils.BreadCrumbsUtil
        array={[
          {
            title: t('breadCrumbs.profile'),
            link: '',
          },
        ]}
      />
      <Profile.Info />
      {isOnline && <Profile.Money />}
      <Profile.Actions />
    </Container>
  )
}

export default ProfilePage
