import ExcelJS from 'exceljs'
import moment from 'moment'

export const ExcelGeneratorIDocuments = (items: IDocumentItems) => {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')
    worksheet.addRow(['מק״ט', 'שם פריט', 'כמות', 'מכיר ליחידה', 'הנחה', 'סה״כ'])
    items?.products?.map((item) => {
      worksheet.addRow([
        item?.sku,
        item?.product?.title,
        item?.quantity,
        item?.priceByOne,
        item?.discount,
        item?.total,
      ])
    })
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'document.xlsx'
      a.click()
      window.URL.revokeObjectURL(url)
    })
  } catch (e) {
    console.log('[ERROR]', e)
  }
}

export const ExcelGeneratorIHistoryPurchse = (items: PurchaseHistoryItem[]) => {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    worksheet.addRow([
      'מסמך',
      'תאריך',
      'כמות',
      'מחיר',
      'מחיר אחרי מע"מ',
      'הנחה',
      'סה"כ בתנועה',
      'סה"כ בתנועה אחרי מע"מ',
    ])

    items?.map((element) => {
      worksheet.addRow([
        element?.documentNumber,
        moment(element?.date).format('DD-MM-YYYY'),
        element?.quantity,
        element?.price,
        element?.vatPrice,
        element?.discount,
        element?.totalPrice,
        element?.vatTotal,
      ])
    })
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'document.xlsx'
      a.click()
      window.URL.revokeObjectURL(url)
    })
  } catch (e) {
    console.log('[ERROR]', e)
  }
}

export const ExcelGeneratorWarehouseDetailed = (
  items: IWarehouseItemDetailed[]
) => {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    worksheet.addRow([
      'מספר מחסן',
      'שם מחסן',
      'עיר',
      'רחוב',
      'מלאי',
      'בהתחייבות',
      'הוזמן',
    ])

    items?.map((element) => {
      worksheet.addRow([
        element?.warehouseCode,
        element?.warehouseTilte,
        element?.city,
        element?.address,
        element?.stock,
        element?.committed,
        element?.ordered,
      ])
    })
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'document.xlsx'
      a.click()
      window.URL.revokeObjectURL(url)
    })
  } catch (e) {
    console.log('[ERROR]', e)
  }
}

export const ExcelGeneratorDynamicTables = (items: IDynamicTables) => {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    worksheet.addRow(items.columns)

    worksheet.addRow(items.columnsEnglish)

    items.lines.forEach((row) => {
      worksheet.addRow(row)
    })

    worksheet.columns?.forEach((col) => {
      let maxLength = 10
      col.eachCell?.({ includeEmpty: true }, (cell) => {
        const val = String(cell.value ?? '')
        maxLength = Math.max(maxLength, val.length + 2)
      })
      col.width = maxLength
    })

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      // include timestamp to avoid name collisions
      const timestamp = moment().format('YYYYMMDD-HHmmss')
      a.href = url
      a.download = `dynamic-table-${timestamp}.xlsx`
      a.click()
      window.URL.revokeObjectURL(url)
    })
  } catch (e) {
    console.error('[ExcelGeneratorDynamicTables ERROR]', e)
  }
}
