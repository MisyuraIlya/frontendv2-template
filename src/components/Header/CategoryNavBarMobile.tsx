import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, List, ListItem, ListItemText, Paper } from '@mui/material'
import { themeColors } from '../../styles/mui'
import CategoryNavItem from './CategoryNavItem'
import useDataCategories from '../../hooks/useDataCategories'

const CategoryNavBarMobile = () => {
  const { data } = useDataCategories()
  const [active, setActive] = useState<number>(0)
  const { lvl1 } = useParams()
  const handleClick = (value: number) => {
    if (value === active) {
      setActive(0)
    } else {
      setActive(value)
    }
  }

  return (
    <List
      sx={{
        backgroundColor: 'white',
        minHeight: '30px',
        color: 'white',
        overflow: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', position: 'relative' }}>
        {data?.map((element) => {
          if (element.lvlNumber === 1 && element.isPublished) {
            return (
              <>
                <ListItem
                  sx={{
                    height: '30px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    color:
                      active == element.id || +lvl1! === element.id
                        ? themeColors.secondary
                        : null,
                  }}
                  key={element.id}
                  onClick={() => handleClick(element.id)}
                >
                  <ListItemText
                    primary={element?.title}
                    sx={{
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      color: themeColors.primary,
                    }}
                  />
                </ListItem>
                {active == element.id && (
                  <Paper
                    elevation={4}
                    sx={{
                      overflow: 'auto',
                      position: 'fixed',
                      top: '127px',
                      width: '100%',
                      maxHeight: '75%',
                      left: '0px',
                    }}
                  >
                    {element?.categories?.map((lvl2) => (
                      <CategoryNavItem
                        item={lvl2}
                        key={lvl2.id}
                        lvl1={element}
                        handleClose={() => setActive(0)}
                      />
                    ))}
                  </Paper>
                )}
              </>
            )
          }
        })}
      </Container>
    </List>
  )
}

export default CategoryNavBarMobile
