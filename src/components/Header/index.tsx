import { useState } from 'react'
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  useMediaQuery,
  Container,
} from '@mui/material'
import Center from './Center'
import CategoryNavBar from './CategoryNavBar'
import Right from './Right'
import Left from './Left'
import { useAuth } from '../../store/auth.store'
import SearchIcon from '@mui/icons-material/Search'
import CategoryNavBarMobile from './CategoryNavBarMobile'
import { useAuthProvider } from '../../provider/AuthProvider'
import { settings } from '../../settings'

const AppBarComponent = () => {
  const { isAdmin, isAgent, user } = useAuth()
  const [openSearch, setOpenSearch] = useState(false)
  const { isAuthrized } = useAuthProvider()
  const isMobile = useMediaQuery('(max-width:1660px)')

  return (
    <AppBar position="sticky" style={{ zIndex: 990 }}>
      <Toolbar
        sx={{
          height: '80px',
          alignContent: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Container
          maxWidth={false}
          sx={{ maxWidth: '1700px', width: '100%', margin: '0 auto' }}
        >
          <Grid container spacing={2}>
            <Grid
              size={{ xs: 3 }}
              sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}
            >
              {isAdmin && <Right.AdminDrawver />}
              <Right.Logo />
              {isAgent && !isMobile && <Right.AgentMenu />}
            </Grid>
            <Grid size={{ xs: 6 }}>
              {!isMobile && isAuthrized && <Center />}
            </Grid>
            <Grid
              size={{ xs: 3 }}
              sx={{
                display: 'flex',
                gap: isMobile ? '5px' : '20px',
                alignItems: 'center',
                justifyContent: 'end',
              }}
            >
              {!isMobile && (
                <>
                  <Left.ProfileButton />
                  {(isAgent || isAdmin) && <Left.ClientsButton />}
                  {user && <Left.CartButton />}
                </>
              )}
              {isMobile && (
                <IconButton onClick={() => setOpenSearch(!openSearch)}>
                  <SearchIcon sx={{ fontSize: '30px' }} />
                </IconButton>
              )}
              {user && <Left.NotificationButton />}
              {settings.isMultiLanguage &&
                <Left.LanguageSwitcher />
              }
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
      {settings.showCategoryNavBar && (
        <>
          {isMobile ? (
            <>{!openSearch && <CategoryNavBarMobile />}</>
          ) : (
            <CategoryNavBar />
          )}
        </>
      )}

      {openSearch && <Center />}
    </AppBar>
  )
}

export default AppBarComponent
