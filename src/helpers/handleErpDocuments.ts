import {
  documentTypesHasavshevet,
  documentTypesPiority,
  documentTypesSap,
} from '../enums/documentsTypes'
import { settings } from '../settings'

export const handleErp = () => {
  console.log('settings',settings)
  if (settings.erp === 'SAP') {
    return documentTypesSap
  } else if (settings.erp === 'PRIORITY') {
    return documentTypesPiority
  } else if (settings.erp === 'HASAVSHEVET') {
    return documentTypesHasavshevet
  }
}
