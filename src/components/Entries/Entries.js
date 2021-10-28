import React, { useMemo, useState, useEffect } from 'react'
import { Container, Button, Stack } from '@mui/material'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { LocalizationProvider } from '@mui/lab'
import SingleEntry from '../SingleEntry'
import Loader from '../Loader'
import { Box } from '@mui/system'
import { useMutation, gql } from '@apollo/client'
import useGetEntriesByDate from '../../graphql/queries/useGetEntriesByDate'
import { GET_ALL_ENTRIES } from '../../graphql/queries/useGetAllEntries'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ModalAddEntry from '../ModalAddEntry/ModalAddEntry'
import { addModalState } from '../../context/addModalOpen'

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
  const [order, setOrder] = useState(0)
  const { isAddEntryModalOpen, setIsAddEntryModalOpen } = addModalState()
  const { data, loading } = useGetEntriesByDate()
  const [entries, setEntries] = useState()
  const [deleteEntry] = useMutation(DELETE_ENTRY, {
    refetchQueries: [GET_ALL_ENTRIES, 'GetAllEntries'],
  })

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
        }
        const dateObj = element.date.split('T')
        return (str += `${dateObj[0]} ${element.startTime} ${element.endTime} ${element.tag.tagBundle.name}-${element.tag.name}\n`)
      })
    }
    setvalueToCopy(str)
    console.log(str)
  }

  useEffect(() => {
    setEntries(data)
  }, [data, entries])

  if (loading) return <Loader />

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Container>
        <h1>My entries</h1>
        {!entries ? null : (
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="success"
              onClick={() => {
                setIsAddEntryModalOpen(true)
                setOrder()
              }}
            >
              <AddCircleOutlineIcon fontSize="large" />
            </Button>
          </Box>
        )}
        {entries?.map((singleEntry) => (
          <Box display="flex" justifyContent="center" key={singleEntry._id}>
            <Stack direction="row" spacing={2}>
              <SingleEntry singleEntry={singleEntry} />
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  setIsAddEntryModalOpen(true)
                  setOrder(singleEntry.order + 1)
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
                }}
              >
                <DeleteIcon fontSize="large" />
              </Button>
            </Stack>
          </Box>
        ))}
        <Box display="flex" marginTop="3rem" justifyContent="flex-end ">
          {entries?.length > 0 && (
            <CopyToClipboard text={valueToCopy} onCopy={() => setCopied(true)}>
              <Button>
                <ContentCopyIcon fontSize="large" />
              </Button>
            </CopyToClipboard>
          )}

        </Box>
      </Container>
      <ModalAddEntry order={order}/>
    </LocalizationProvider>
  )
}

export default Entries
