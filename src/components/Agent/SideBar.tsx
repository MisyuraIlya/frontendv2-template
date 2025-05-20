import React from 'react'
import { useAuth } from '../../store/auth.store'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import useDataAgents from '../../hooks/agent/useAgentsData'

const SideBar = () => {
  const { setAgent, user } = useAuth()
  const { id, dateFrom, dateTo } = useParams()
  const { data } = useDataAgents()
  const navigate = useNavigate()

  const handleChange = (agent: IUser) => {
    setAgent(agent)
    navigate(`/agentDashboard/0/${agent.id}/${dateFrom}/${dateTo}`)
  }
  return (
    <>
      <List sx={{ width: '100%' }}>
        {data?.data?.map((item) => (
          <ListItem
            onClick={() => handleChange(item)}
            alignItems="flex-start"
            key={item.id}
            sx={{
              margin: '10px 0',
              cursor: 'pointer',
              borderRadius: '5px',
              background: +id! == item?.id ? '#d1d9e8' : null,
              border: user?.id == item.id ? '1px solid #d1d9e8' : null,
            }}
          >
            <ListItemAvatar>
              <Avatar alt={item?.name ?? item?.extId} />
            </ListItemAvatar>
            <ListItemText
              primary={item.name ?? `סוכן מספר ${item?.extId}`}
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item.phone}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      {/* <div className="agentsListMainCont">
        <div className="AgentsList">
          <div className="MyDivider"></div>
          <div className="AgentsListCont">
            {agentList && agentList.length
              ? agentList.map((item, index) => {
                  return (
                    <Link key={index} to={`/${page}/${item.id}`}>
                      <div
                        className={item?.id === Number(id) ? 'set-border' : ''}
                      >
                        <div
                          className={
                            item?.id === Number(id)
                              ? 'AgentsListContRow active'
                              : 'AgentsListContRow'
                          }
                        >
                          <p>{'#' + item.extId}</p>
                          <p>{item.name}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })
              : null}
          </div>
        </div>
      </div> */}
    </>
  )
}

export default SideBar
