import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Skeleton,
  IconButton,
  Tooltip,
} from '@mui/material'
import { DocumentTypeHebrew } from '../../../helpers/DocumentTypeHebrew'
import { useAuth } from '../../../store/auth.store'
import hooks from '../../../hooks'
import InfoIcon from '@mui/icons-material/Info'
import UserMenu from './UserMenu'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import { useTranslation } from 'react-i18next'
import emptyDoc from '../../../assets/images/empyDocument.svg'

const List = () => {
  const { documentType } = useParams()
  const { data, isLoading } = hooks.useDataDocuments()
  const { user, isAdmin } = useAuth()
  const { t } = useTranslation()

  const navigate = useNavigate()

  const handleNavigate = (element: IDocument) => {
    if (documentType === 'offline') {
      navigate(`/documentItemPage/offline/${element?.id}`)
    } else if (documentType === 'history' || documentType === 'draft') {
      navigate(`/documentItemPage/history/${element?.id}`)
    } else {
      navigate(
        `/documentItemPage/${element?.documentType.trim()}/${element?.documentNumber}`
      )
    }
  }

  const handleStatus = (value: string) => {
    if (value === 'paid') {
      return 'שודר'
    } else if (value === 'draft') {
      return 'טיוטה'
    } else if (value === 'pending') {
      return 'ממתין'
    } else if (value === 'failed') {
      return 'שגיאה'
    } else if (value === 'waiting_approve') {
      return 'ממתין לאישור'
    } else {
      return value
    }
  }

  return (
    <Box sx={{ marginTop: '50px' }}>
      {data?.documents.length === 0 && !isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={emptyDoc}
            alt="Empty document"
          />
        </Box>
      ) : null}
      {isLoading &&
        Array.from({ length: 12 }).map((_, index) => (
          <Skeleton
            variant="rounded"
            key={index}
            height={50}
            sx={{ margin: '5px 0' }}
          />
        ))}
      {(data?.documents ?? []).length > 0 ? (
        <TableContainer component={Paper}>
          <Table className="lines-sub-cont">
            <TableHead>
              <TableRow className="heading">
                <TableCell className="col-cont sticky-col">
                  {t('documents.documentNumber')}
                </TableCell>
                <TableCell sx={{ minWidth: '150px' }}>
                  {t('documents.purchaseNumber')}
                </TableCell>
                {(user?.role === 'ROLE_AGENT' ||
                  user?.role === 'ROLE_SUPER_AGENT' ||
                  user?.role === 'ROLE_ADMIN') &&
                  documentType === 'order' && (
                    <TableCell sx={{ minWidth: '150px' }}>
                      {t('documents.agent')}
                    </TableCell>
                  )}
                <TableCell sx={{ minWidth: '150px' }}>
                  {t('documents.type')}
                </TableCell>
                <TableCell sx={{ minWidth: '100px' }}>
                  {t('documents.documentDate')}
                </TableCell>
                <TableCell sx={{ minWidth: '100px' }}>
                  {t('documents.deliveryDate')}
                </TableCell>
                <TableCell sx={{ minWidth: '150px' }}>
                  {t('documents.paymentDate')}
                </TableCell>
                <TableCell className="col-cont">
                  {t('documents.total')}
                </TableCell>
                <TableCell className="col-cont">
                  {t('documents.status')}
                </TableCell>
                {isAdmin && documentType === 'history' && (
                  <TableCell className="col-cont">
                    {t('documents.error')}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                data?.documents?.map((element, index) => {
                  return (
                    <TableRow
                      key={index}
                      className={'item'}
                      onClick={() => handleNavigate(element)}
                    >
                      <TableCell>
                        <Typography variant="body2">
                          {element?.documentNumber ?? element.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {element?.userExId}
                        </Typography>
                        {element?.user ? (
                          <UserMenu document={element} />
                        ) : (
                          <Typography variant="body2">
                            {element?.userName}
                          </Typography>
                        )}
                      </TableCell>
                      {(user?.role === 'ROLE_AGENT' ||
                        user?.role === 'ROLE_SUPER_AGENT' ||
                        user?.role === 'ROLE_ADMIN') &&
                        documentType === 'order' && (
                          <TableCell>
                            <Typography variant="body2">
                              {element?.agentExId ?? '-'}
                            </Typography>
                            <Typography variant="body2">
                              {element?.agentName}
                            </Typography>
                          </TableCell>
                        )}
                      <TableCell>
                        <Typography variant="body2">
                          {documentType &&
                            DocumentTypeHebrew(element?.documentType)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {moment(element?.createdAt).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {moment(element?.dueDateAt).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {moment(element?.updatedAt).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {numberWithCommas(element?.total)} ₪
                        </Typography>
                      </TableCell>
                      <TableCell>{handleStatus(element?.status)}</TableCell>
                      {isAdmin && documentType === 'history' && (
                        <TableCell>
                          {element?.error && (
                            <Tooltip
                              title={element?.error}
                              style={{ cursor: 'help' }}
                            >
                              <IconButton
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                }}
                              >
                                <InfoIcon color="error" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Box>
  )
}

export default List
