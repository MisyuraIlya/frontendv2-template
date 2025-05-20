import React from 'react'
import { Box, Tab as MuiTab, Tabs as MuiTabs } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

type Props = {
  /** One or more <Tab> elements */
  children: React.ReactNode
  baseRoute: string
  params: string[]
  isDatable?: boolean
  tabDatable?: ITabDatable[]
}

interface ITabDatable {
  tabIndex: number
  dateFrom: string
  dateTo: string
}

export const Tabs = ({
  children,
  baseRoute,
  params,
  isDatable = false,
  tabDatable = [],
}: Props) => {
  const navigate = useNavigate()
  const { tab, ...routeParams } = useParams<{
    tab: string
    [key: string]: string
  }>()

  if (typeof tab === 'undefined') {
    throw new Error('To use tabs there must be a URL parameter called `tab`')
  }
  const currentTab = parseInt(tab, 10)
  if (Number.isNaN(currentTab)) {
    throw new Error('Tab parameter must be a number')
  }

  const tabElements = React.Children.toArray(children).filter(
    (
      child
    ): child is React.ReactElement<{
      label: string
      children: React.ReactNode
    }> => React.isValidElement(child)
  )

  const handleTabChange = (_: React.SyntheticEvent, newTabIndex: number) => {
    const newRouteParams: Record<string, string> = {
      tab: newTabIndex.toString(),
      ...routeParams,
    }
    let route = baseRoute + '/' + params.map((p) => newRouteParams[p]).join('/')

    if (isDatable) {
      const match = tabDatable.find((d) => d.tabIndex === newTabIndex)
      if (match) {
        route += `/${match.dateFrom}/${match.dateTo}`
      }
    }

    navigate(route)
  }

  return (
    <Box>
      <MuiTabs value={currentTab} onChange={handleTabChange}>
        {tabElements.map((el, idx) => (
          <MuiTab key={idx} label={el.props.label} />
        ))}
      </MuiTabs>
      <Box>{tabElements[currentTab]?.props.children ?? null}</Box>
    </Box>
  )
}
