import { Box, Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import Loader from '../utils/Loader'
import { findDocumentTypeTitle } from '../helpers/handleBreadCrumbs'
import Documents from '../components/Documents'
import Utils from '../utils'
import hooks from '../hooks'
import { handleErp } from '../helpers/handleErpDocuments'
import useDirection from '../hooks/useDirection'
import { useTranslation } from 'react-i18next'

type RouteParams = {
  documentType: IDocumentTypes
  dateFrom: string
  dateTo: string
}

const DocumentsPage = () => {
  const { documentType } = useParams<RouteParams>()
  const dir = useDirection()
  const { t } = useTranslation()
  const documentComponents: Record<string, React.ReactNode> =
    Object.fromEntries(
      handleErp()!.map((doc) => [
        doc.value,
        <Documents.Document.List key={doc.value} />,
      ])
    )
  const erpDocumentTypes = handleErp()
  const isDocumentValid = erpDocumentTypes?.some(
    (doc) => doc.value === documentType
  )
  const componentToRender =
    isDocumentValid && documentComponents[documentType!] ? (
      documentComponents[documentType!]
    ) : (
      <Box sx={{ textAlign: 'center', mt: '150px', mb: '150px' }}>
        <Typography sx={{ fontWeight: 500, fontSize: '20px' }}>
          {t('documents.notFoundDocument')}
        </Typography>
      </Box>
    )

  const { data, isLoading } = hooks.useDataDocuments()

  return (
    <Container maxWidth="xl">
      {isLoading && <Loader />}
      <Box sx={{ mt: '50px' }}>
        <Utils.BreadCrumbsUtil
          array={[
            {
              title: findDocumentTypeTitle(documentType, dir),
              link: '',
            },
          ]}
        />
      </Box>
      <Documents.Document.Filter />
      {componentToRender}
      {data && <Utils.PaginationUtil pagination={data} />}
    </Container>
  )
}

export default DocumentsPage
