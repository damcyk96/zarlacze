import React, { useState, useEffect } from 'react'
import { Container, Button, Stack } from '@mui/material'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { LocalizationProvider } from '@mui/lab'
import SingleEntry from '../SingleEntry'
import Loader from '../Loader'
import { Box } from '@mui/system'
import { useMutation, gql } from '@apollo/client'
import useGetEntriesByDate, {
  GET_ENTRIES_BY_DATE,
} from '../../graphql/queries/useGetEntriesByDate'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { CREATE_ENTRY } from '../../graphql/mutations/createEntryMutation'
import { dateState } from '../../context/date'
import { UPDATE_ENTRY } from '../../graphql/mutations/updateEntry'
import { format } from 'date-fns'
import cogoToast from 'cogo-toast'

const DELETE_ENTRY = gql`
  mutation DeleteEntry($_id: MongoID!) {
    entryRemoveById(_id: $_id) {
      recordId
    }
  }
`

const Entries = () => {
  const [valueToCopy, setvalueToCopy] = useState('')
  const [copied, setCopied] = useState(false)
  const [pickedOrder, setPickedOrder] = useState(0)
  const { data, loading } = useGetEntriesByDate()
  const [entries, setEntries] = useState()
  const { dateQueryFormat } = dateState()
  const [deleteEntry] = useMutation(DELETE_ENTRY, {
    refetchQueries: [GET_ENTRIES_BY_DATE, 'GetEntriesByDate'],
  })
  const [createEntry] = useMutation(CREATE_ENTRY, {
    refetchQueries: [GET_ENTRIES_BY_DATE, 'GetEntriesByDate'],
  })

  const handleCreateEntry = (order, startTime) => {
    createEntry({
      variables: {
        record: {
          tagBundleName: '',
          tagName: '',
          startTime: startTime ? startTime : '00:00',
          endTime: '00:01',
          date: dateQueryFormat,
          order: order,
        },
      },
    })
  }

  const copyEntries = () => {
    let str = ''
    if (entries && entries.length > 0) {
      entries.forEach((element) => {
        if (
          !element.startTime ||
          !element.endTime ||
          !element.tag.tagBundle.name ||
          !element.tag.name
        ) {
          alert('Something is wrong')
          return
        } else {
          const dateObj = element.date.split('T')
          str += `${dateObj[0]} ${element.startTime} ${element.endTime} ${element.tag.tagBundle.name}-${element.tag.name}\n`
        }
        return str
      })
    }
    setvalueToCopy(str)
  }

  useEffect(() => {
    setEntries(data)
  }, [data])

  const [updateEntry] = useMutation(UPDATE_ENTRY)
  useEffect(() => {
    if (entries) {
      const newEntries = entries.map((entry, i) => {
        return {
          ...entry,
          order: i,
        }
      })
      if (newEntries) {
        newEntries.forEach((entry, i) => {
          updateEntry({
            variables: {
              _id: entry._id,
              record: {
                order: i,
              },
            },
          })
        })
      }
    }
  }, [entries])
  if (loading) return <Loader />
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Container>
        {entries?.length === 0 && <h1>Add first entry</h1>}
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              const obj = {
                order: -1,
              }
              let newEntries = [...entries]
              newEntries.splice(0, 0, obj)
              handleCreateEntry(0)
            }}
          >
            <AddCircleOutlineIcon fontSize="large" />
          </Button>
        </Box>
        {entries?.map((singleEntry, index) => (
          <Box
            display="flex"
            justifyContent="center"
            key={singleEntry._id}
            style={{ marginTop: '1rem' }}
          >
            <Stack direction="row" spacing={2}>
              <SingleEntry singleEntry={singleEntry} date={dateQueryFormat} />
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  const obj = {
                    order: singleEntry.order + 1,
                  }
                  let newEntries = [...entries]
                  newEntries.splice(index, 0, obj)
                  handleCreateEntry(index)
                }}
              >
                <AddCircleOutlineIcon fontSize="large" />
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  deleteEntry({
                    variables: {
                      _id: singleEntry._id,
                    },
                  })
                  cogoToast.error('Entry was deleted')
                }}
              >
                <DeleteIcon fontSize="large" />
              </Button>
            </Stack>
          </Box>
        ))}
        <Box display="flex" marginTop="3rem" justifyContent="flex-end ">
          {entries?.length > 0 && (
            <>
              <Button
                onClick={() => {
                  const newStartTime = format(new Date(), 'HH:MM')
                  updateEntry({
                    variables: {
                      _id: entries[entries.length - 1]._id,
                      record: {
                        endTime: newStartTime,
                      },
                    },
                  })
                  handleCreateEntry(entries[entries.length], newStartTime)
                }}
              >
                <HighlightOffIcon color="error" fontSize="large" />
              </Button>
              <CopyToClipboard
                text={valueToCopy}
                onCopy={() => setCopied(true)}
              >
                <Button>
                  <ContentCopyIcon fontSize="large" onClick={copyEntries} />
                </Button>
              </CopyToClipboard>
            </>
          )}
        </Box>
      </Container>
    </LocalizationProvider>
  )
}

export default Entries
