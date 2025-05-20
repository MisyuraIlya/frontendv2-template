import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import { AdminProductService } from '../../../services/admin/AdminProducts.service'
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
import Card from './Card'
import { useAdminStore } from '../../../store/admin.store'
import hooks from '../../../hooks'

const List = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const { data } = hooks.admin.useDataProductsEdit()
  const { searchProducts } = useAdminStore()

  const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? '#e5e5e5' : '#ddd',
  })

  const reorder = (list: IProduct[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return
    }
    const newProducts = reorder(
      products,
      result.source.index,
      result.destination.index
    )

    const updatedProducts = newProducts.map((product, index) => ({
      ...product,
      orden: index,
    }))

    setProducts(updatedProducts)
    await AdminProductService.updateProductOrder(updatedProducts)
  }

  useEffect(() => {
    setProducts(data ?? [])
  }, [data])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TableContainer component={Paper} elevation={0}>
        <Table className="lines-sub-cont">
          <TableHead>
            <TableRow className="heading">
              <TableCell className="col-cont sticky-col">
                <Typography variant="subtitle2">תמונה</Typography>
              </TableCell>
              <TableCell className="col-cont sticky-col">
                <Typography variant="subtitle2">גלריה</Typography>
              </TableCell>
              <TableCell className="col-cont sticky-col">
                <Typography variant="subtitle2">מק״ט</Typography>
              </TableCell>
              <TableCell className="col-cont sticky-col">
                <Typography variant="subtitle2">כותרת מוצר</Typography>
              </TableCell>
              <TableCell className="col-cont sticky-col">
                <Typography variant="subtitle2">חדש?</Typography>
              </TableCell>
              <TableCell className="col-cont sticky-col">
                <Typography variant="subtitle2">נמכר ביותר?</Typography>
              </TableCell>
              <TableCell className="col-cont sticky-col">
                <Typography variant="subtitle2">סטטוס</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <TableBody
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {products
                  .filter((element) => {
                    if (!searchProducts) return true
                    const searchLower = searchProducts.toLowerCase()
                    return (
                      element.title.toLowerCase().includes(searchLower) ||
                      element.sku.toLowerCase().includes(searchLower)
                    )
                  })
                  .map((element) => (
                    <Card
                      key={element.id}
                      element={element}
                      index={element.id!}
                    />
                  ))}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </TableContainer>
    </DragDropContext>
  )
}

export default List
