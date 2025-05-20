import React, { useEffect, useState } from 'react'
import useAdminAttributeDetailed from '../../../hooks/admin/useAdminAttributeDetailed'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Loader from '../../../utils/Loader'
import { AdminAttributesService } from '../../../services/admin/AdminAttributes.service'
import Card from './Card'

const List = () => {
  const { data, isLoading } = useAdminAttributeDetailed()
  const [attributes, setAttributes] = useState<ISubAttributes[]>([])

  const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? '#e5e5e5' : '#ddd',
  })

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: any
  ): React.CSSProperties => ({
    userSelect: 'none',
    background: isDragging ? '#f9f9f9' : '#fff',
    ...draggableStyle,
  })

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const reorderedAttributes = reorder(
      attributes,
      result.source.index,
      result.destination.index
    )

    const updatedAttributes = reorderedAttributes.map((attribute, index) => ({
      ...attribute,
      orden: index,
    }))

    setAttributes(reorderedAttributes)
    await AdminAttributesService.dragAndDropAttributeDetailed(updatedAttributes)
  }

  const reorder = (
    list: ISubAttributes[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  useEffect(() => {
    if (data && data.SubAttributes) {
      const sortedSubAttributes = [...data.SubAttributes].sort(
        (a, b) => a.orden - b.orden
      )
      setAttributes(sortedSubAttributes)
    }
  }, [data])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isLoading && <Loader />}
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Box
            sx={{ margin: '0' }}
            {...provided.innerRef}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <TableContainer component={Paper}>
              {isLoading && <Loader />}
              <Table>
                <TableHead>
                  <TableCell>שם</TableCell>
                  <TableCell>פעיל/לא פעיל</TableCell>
                </TableHead>
                <TableBody>
                  {attributes?.map((element, index) => (
                    <Draggable
                      key={element.id}
                      draggableId={element.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <Card element={element} />
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default List
