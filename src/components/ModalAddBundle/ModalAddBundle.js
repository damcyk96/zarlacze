import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { modalState } from '../../context/modalOpen'
import { TextareaAutosize, TextField } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { useMutation } from '@apollo/client'
import { CREATE_BUNDLE } from '../../graphql/mutations/createNewBundle'
import { GET_ACTIVE_BUNDLES } from '../../graphql/queries/useGetActiveBundles'
import { ASSIGN_BUNDLE } from '../../graphql/mutations/assignBundleById'

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

const ModalAddBundle = () => {
  const [addBundle] = useMutation(CREATE_BUNDLE)

  const [assignBundle] = useMutation(ASSIGN_BUNDLE, {
    refetchQueries: [GET_ACTIVE_BUNDLES, 'GetActiveBundles'],
  })

  const handleAddBundle = () => {
    addBundle({
      variables: {
        record: {
          name: bundleName,
          description: bundleDescription,
        },
      },
    }).then((response) => {
      console.log(response)
      assignBundle({
        variables: {
          bundleId: response.data.tagBundleCreateOne.recordId,
        },
      })
    })
  }
  const { handleClose, isOpen } = modalState()
  const [bundleName, setBundleName] = useState('')
  const [bundleDescription, setBundleDescription] = useState('')
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button onClick={handleClose}>
            <CancelIcon fontSize="large" color="error" />
          </Button>
          <Box display="flex" flexDirection="column">
            <h1>Add Bundle</h1>
            <TextField
              style={{ width: '100%' }}
              id="outlined-basic"
              label="Bundle name"
              variant="outlined"
              onChange={(e) => setBundleName(e.target.value)}
            />
            <TextareaAutosize
              style={{ marginTop: '2rem', width: '100%' }}
              aria-label="minimum height"
              minRows={6}
              placeholder="Description bundle"
              onChange={(e) => setBundleDescription(e.target.value)}
            />
            <Button
              variant="contained"
              style={{ marginTop: '2rem' }}
              onClick={() => {
                handleAddBundle()
                handleClose()
              }}
            >
              Add bundle
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalAddBundle
