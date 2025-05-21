import useBonuses from '../../../hooks/admin/useBonuses'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Loader from '../../../utils/Loader'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../enums/urls'

const List = () => {
  const { data, isLoading } = useBonuses()
  const navigate = useNavigate()
  return (
    <TableContainer component={Paper}>
      {isLoading && <Loader />}
      <Table>
        <TableHead>
          <TableCell>מזה</TableCell>
          <TableCell>שם</TableCell>
          <TableCell>מס&apos; לקוח</TableCell>
          <TableCell>תאריך יצירה</TableCell>
          <TableCell>לתאריך</TableCell>
        </TableHead>
        {data &&
          data?.map((element) => {
            return (
              <TableBody
                key={element.id}
                onClick={() =>
                  navigate(`${URLS.BONUSES_ITEM_PAGE.LINK}/${element.id}`)
                }
              >
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {element?.extId ?? element?.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {element?.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {element?.userExtId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {moment(element?.createdAt).format('DD-MM-YYYY')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {moment(element?.expiredAt).format('DD-MM-YYYY')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            )
          })}
      </Table>
    </TableContainer>
  )
}

export default List
