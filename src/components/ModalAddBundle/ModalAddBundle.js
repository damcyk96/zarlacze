import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { addModalState, modalState } from '../../context/addModalOpen'
import { TextareaAutosize, TextField } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { useMutation } from '@apollo/client'
import { CREATE_BUNDLE } from '../../graphql/mutations/createNewBundle'
import { GET_ALL_BUNDLES } from './../../graphql/queries/useGetAllBundles'
import { Formik } from 'formik'
import { userFormSchema } from '../../schemas'

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
  const initialValues = {
    bundleName: '',
    description: '',
  }
  const [addBundle] = useMutation(CREATE_BUNDLE, {
    refetchQueries: [GET_ALL_BUNDLES, 'GetAllBundles'],
  })

  const { isAddModalOpen, setIsAddModalOpen } = addModalState()
  const [bundleName, setBundleName] = useState('')
  const [bundleDescription, setBundleDescription] = useState('')
  return (
    <div>
      <Formik
        validationSchema={userFormSchema}
        initialValues={initialValues}
        isInitialValid={false}
      >
        {({ handleChange, handleBlur, values, touched, isValid, errors }) => {
          const handleAddBundle = () => {
            addBundle({
              variables: {
                record: {
                  name: values.bundleName,
                  description: values.description,
                },
              },
            })
          }
          return (
            <Modal
              open={isAddModalOpen}
              onClose={() => {
                setIsAddModalOpen(false)
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Button
                  onClick={() => {
                    setIsAddModalOpen(false)
                  }}
                >
                  <CancelIcon fontSize="large" color="error" />
                </Button>
                <Box display="flex" flexDirection="column">
                  <h1>Add Bundle</h1>
                  <TextField
                    style={{ width: '100%' }}
                    id="outlined-basic"
                    label="Bundle name"
                    variant="outlined"
                    onChange={handleChange}
                    name="bundleName"
                    isInvalid={touched.bundleName && errors.bundleName}
                    onBlur={handleBlur}
                  />
                  <TextareaAutosize
                    style={{ marginTop: '2rem', width: '100%' }}
                    aria-label="minimum height"
                    minRows={6}
                    placeholder="Description bundle"
                    name="description"
                    isInvalid={touched.description && errors.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <p style={{ color: 'red' }}>{errors && errors.bundleName}</p>
                  <p style={{ color: 'red' }}>{errors && errors.description}</p>
                  <Button
                    variant="contained"
                    style={{ marginTop: '2rem' }}
                    disabled={!isValid}
                    onClick={() => {
                      handleAddBundle()
                      setIsAddModalOpen(false)
                    }}
                  >
                    Add bundle
                  </Button>
                </Box>
              </Box>
            </Modal>
          )
        }}
      </Formik>
    </div>
  )
}

export default ModalAddBundle
