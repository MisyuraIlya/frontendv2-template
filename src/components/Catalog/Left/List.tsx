import { useCatalog } from '../../../store/catalog.store'
import { Box, Grid, Skeleton } from '@mui/material'
import ProductCard from '../../common/ProductCard'
import hooks from '../../../hooks'
import { useMobile } from '../../../provider/MobileProvider'
import LineProductCard from '../../common/LineProductCard'
import catalogEmpty from '../../../assets/images/catalogEmpty.svg'

const List = () => {
  const { listView } = useCatalog()
  const { data, isLoading } = hooks.useDataCatalog()
  const { isMobile } = useMobile()

  return (
    <Grid container spacing={2}>
      {isLoading ? (
        <>
          {Array.from({ length: 24 }).map((_, index) => (
            <Grid
              size={{ xs: listView === 'list' ? 12 : isMobile ? 6 : 3 }}
              key={index}
            >
              <Skeleton
                variant="rounded"
                height={listView === 'list' ? 150 : 120}
                sx={{ margin: '5px 0' }}
              />
              {listView !== 'list' && (
                <>
                  <Skeleton
                    variant="rounded"
                    height={120}
                    sx={{ margin: '5px 0' }}
                  />
                  <Skeleton variant="rounded" height={60} />
                </>
              )}
            </Grid>
          ))}
        </>
      ) : (
        <>
          {data?.data?.map((product, index) => (
            <Grid
              size={{
                xs: listView === 'list' ? 12 : 6,
                sm: listView === 'list' ? 12 : 3,
              }}
              key={index}
            >
              {listView === 'list' ? (
                <LineProductCard product={product} />
              ) : (
                <ProductCard product={product} />
              )}
            </Grid>
          ))}
        </>
      )}
      {data?.data?.length === 0 && (
        <Box
          sx={{
            minHeight: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <img
            src={`${catalogEmpty}`}
            alt="No products available"
          />
        </Box>
      )}
    </Grid>
  )
}

export default List
