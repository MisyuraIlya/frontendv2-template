import { Box, Pagination, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useDirection from '../hooks/useDirection'

interface PaginationUtilProps {
  pagination: IPagination
}

const PaginationUtil: FC<PaginationUtilProps> = ({ pagination }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const dir = useDirection()

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log(event)
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', page.toString())
    const updatedUrl = '?' + urlSearchParams.toString()
    navigate(pathname + updatedUrl)
    window.scrollTo(0, 0)
  }

  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(65,67,106,.2117647059)',
        borderBottom: '1px solid rgba(65,67,106,.2117647059)',
        padding: '10px',
        margin: '30px 0',
        marginBottom: '70px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Pagination
        count={+pagination.pageCount}
        page={+pagination.page}
        onChange={handlePageChange}
        sx={{
          '& .MuiPaginationItem-previousNext .MuiSvgIcon-root': {
            direction: dir,
            transform: dir === 'rtl' ? 'rotate(0deg)' : 'rotate(180deg)',
          },
        }}
      />
      <Box sx={{ gap: '10px', display:'flex', justifyContent:'center', alignItems:'center' }} >
        <Typography>
          {t('pagination.currentPage', { page: pagination.page })}
        </Typography>
        <Typography>
          {t('pagination.totalPages', { total: pagination.pageCount })}
        </Typography>
      </Box>
    </Box>
  )
}

export default PaginationUtil
