import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { addModalState } from '../../context/addModalOpen'
import { MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { useMutation } from '@apollo/client'
import { CREATE_BUNDLE } from '../../graphql/mutations/createNewBundle'
import { GET_ALL_ENTRIES } from '../../graphql/queries/useGetAllEntries'
import { TimePicker } from '@mui/lab'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const ModalAddEntry = ({ order }) => {
  const [addEntry] = useMutation(CREATE_BUNDLE, {
    refetchQueries: [GET_ALL_ENTRIES, 'GetAllEntries'],
  })

  const handleAddEntry = () => {
    addEntry({
      variables: {
        record: {
          name: bundleName,
          description: bundleDescription,
        },
      },
    })
  }
  const { isAddEntryModalOpen, setIsAddEntryModalOpen } = addModalState()
  const [bundleName, setBundleName] = useState('')
  const [bundleDescription, setBundleDescription] = useState('')
  return (
    <div>
      <Modal
        open={isAddEntryModalOpen}
        onClose={() => {
          setIsAddEntryModalOpen(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            onClick={() => {
              setIsAddEntryModalOpen(false)
            }}
          >
            <CancelIcon fontSize="large" color="error" />
          </Button>
          <Box display="flex" flexDirection="column">
            <h1>Add Entry</h1>
            <TimePicker
              flex
              label="Start time"
              ampm={false}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="End time"
              ampm={false}
              renderInput={(params) => <TextField {...params} />}
            />

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Bundle"
              style={{ minWidth: '12rem' }}
            >
              {/* <MenuItem value={singleEntry.tag?.tagBundle.name}>
          {singleEntry.tag?.tagBundle.name}
        </MenuItem> */}
            </Select>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Tag"
              style={{ minWidth: '12rem' }}
            >
              {/* <MenuItem value={singleEntry.tag?.name}>
          {singleEntry.tag?.name}
        </MenuItem> */}
            </Select>
            <Button
              variant="contained"
              style={{ marginTop: '2rem' }}
              onClick={() => {
                handleAddEntry()
                setIsAddEntryModalOpen(false)
              }}
            >
              Add entry
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalAddEntry
