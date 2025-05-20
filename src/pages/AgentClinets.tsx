import Loader from '../utils/Loader'
import { Container } from '@mui/material'
import hooks from '../hooks'
import Utils from '../utils'
import Agent from '../components/Agent'
import { useTranslation } from 'react-i18next'
const AgentClinets = () => {
  const { data, isLoading } = hooks.agent.useDataAgentClients()
  const { t } = useTranslation()
  return (
    <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
      <Utils.BreadCrumbsUtil
        array={[
          {
            title: t('breadCrumbs.myClient'),
            link: '',
          },
        ]}
      />
      {isLoading && <Loader />}
      <Agent.Clients.Filter />
      <Agent.Clients.List />
      {data && <Utils.PaginationUtil pagination={data} />}
    </Container>
  )
}

export default AgentClinets
