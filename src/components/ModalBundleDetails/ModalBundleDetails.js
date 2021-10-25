import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { TextareaAutosize, TextField } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { detailsModalState } from '../../context/detailsModalOpen'
import useGetBundleById from '../../graphql/queries/useGetBundleById'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const ModalBundleDetails = () => {
  const { isDetailsModalOpen, setIsDetailsModalOpen, bundleId } =
    detailsModalState()
    console.log(bundleId)
  const getBundle = useGetBundleById(bundleId)
  const [page, setPage] = useState(1)
  const [bundleDescription, setBundleDescription] = useState('')
  return (
    <div>
      <Modal
        open={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            onClose={() => {
              setIsDetailsModalOpen(false)
            }}
          >
            <CancelIcon fontSize="large" color="error" />
          </Button>
          <Box display="flex" flexDirection="column">
            <h1>{bundleId}</h1>
            <TextField
              style={{ width: '100%' }}
              id="outlined-basic"
              label="Bundle name"
              variant="outlined"
            />
            <TextareaAutosize
              style={{ marginTop: '2rem', width: '100%' }}
              aria-label="minimum height"
              minRows={6}
              placeholder="Description bundle"
              onChange={(e) => setBundleDescription(e.target.value)}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalBundleDetails
