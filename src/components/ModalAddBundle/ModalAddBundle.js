import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { modalState } from '../../context/modalOpen'
import { TextareaAutosize, TextField } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'

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
            <Button variant="contained" style={{ marginTop: '2rem' }}>
              Add bundle
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalAddBundle
