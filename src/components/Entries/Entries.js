import React, { useState, useEffect, useMemo } from 'react'
import { Container, Button, Stack } from '@mui/material'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { LocalizationProvider } from '@mui/lab'
import SingleEntry from '../SingleEntry'
import Loader from '../Loader'
import { Box } from '@mui/system'
import { useMutation, gql } from '@apollo/client'
import useGetEntriesByDate from '../../graphql/queries/useGetEntriesByDate'
import { GET_ALL_ENTRIES } from '../../graphql/queries/useGetAllEntries'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const DELETE_ENTRY = gql`
  mutation DeleteEntry($_id: MongoID!) {
    entryRemoveById(_id: $_id) {
      recordId
    }
  }
`

const Entries = () => {
  const { data, loading } = useGetEntriesByDate()
  const [entries, setEntries] = useState()
  const [deleteEntry] = useMutation(DELETE_ENTRY, {
    refetchQueries: [GET_ALL_ENTRIES, 'GetAllEntries'],
  })
  const [copied, setCopied] = useState(false)
  const [valueToCopy, setvalueToCopy] = useState('Tekst')

  useMemo(() => {
    let str = ''
    if (entries) {
      entries.forEach(
        (element) =>
          (str += `${element.startTime} ${element.endTime} ${element.tag.tagBundle.name}-${element.tag.name}\n`)
      )
    }
    setvalueToCopy(str)
    console.log(str)
  }, [entries])

  useEffect(() => {
    setEntries(data)
  }, [data, entries])
  if (loading) return <Loader />

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    console.log(result)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const items = reorder(
      entries,
      result.source.index,
      result.destination.index
    )
    console.log(this.state.items)
    this.setState({
      items,
    })
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DragDropContext
        onDragEnd={() => {
          handleDragEnd()
        }}
      >
        <Container>
          <h1>My entries</h1>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {entries?.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Box
                          display="flex"
                          justifyContent="center"
                          key={item._id}
                          style={{ marginTop: '1rem' }}
                        >
                          <Stack direction="row" spacing={2}>
                            <SingleEntry singleEntry={item} />
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                deleteEntry({
                                  variables: {
                                    _id: item._id,
                                  },
                                })
                              }}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </Box>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <CopyToClipboard text={valueToCopy} onCopy={() => setCopied(true)}>
            <button>Copy to clipboard with button</button>
          </CopyToClipboard>
        </Container>
      </DragDropContext>
    </LocalizationProvider>
  )
}

export default Entries
