import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Container, TextareaAutosize } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { GET_BUNDLE_BY_ID } from '../../graphql/queries/useGetBundleById'
import { GET_TAGS_BY_ID } from '../../graphql/queries/useGetTagsByBundleId'
import Loader from '../Loader/Loader'
import { useQuery, useMutation } from '@apollo/client'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { GET_PROFILE } from '../../graphql/queries/useGetProfile'
import { EDIT_DESCRIPTION_BUNDLE } from '../../graphql/mutations/editDescriptionBundle'

const BundleDetails = () => {
  const { bundleId } = useParams() // ID KLIKNIETEGO BUNDLA HERE
  const [page, setPage] = useState(1)
  const [profileId, setProfileId] = useState('')
  const [creatorId, setCreatorId] = useState('')
  const [description, setDescription] = useState('')
  const userData = useQuery(GET_PROFILE)

  const [bundleDescription, setBundleDescription] = useState('')
  const bundleResponse = useQuery(GET_BUNDLE_BY_ID, {
    variables: {
      _id: bundleId,
      // _id: '6176e9a21322518c90158ad1',
    },
  })

  const tagsResponse = useQuery(GET_TAGS_BY_ID, {
    variables: {
      // _id: bundleId,
      filter: bundleId,
      page: page,
    },
  })
  const [editDescription] = useMutation(EDIT_DESCRIPTION_BUNDLE)

  const handleEditDescription = (bundleId, description) => {
    editDescription({
      variables: {
        bundleId: bundleId,
        description: description,
      },
    })
  }

  const handleChange = (event, value) => {
    setPage(value)
    tagsResponse.fetchMore({
      variables: {
        filter: bundleId,
        page: page,
      },
    })
  }
  useEffect(() => {
    if (userData.data && bundleResponse.data) {
      setDescription(bundleResponse.data.tagBundleById.description)
      setProfileId(userData.data.getProfile._id)
      if (bundleResponse.data.tagBundleById.creator != null) {
        setCreatorId(bundleResponse.data.tagBundleById.creator._id)
      } else {
        setCreatorId(null)
      }
    }
  }, [userData.data, bundleResponse.data])

  console.log(description)

  if (bundleResponse.loading || tagsResponse.loading) return <Loader />
  const handleChangeTextArea = (event) => {
    setDescription(event.target.value)
  }

  return (
    <div>
      <Container>
        <Box display="flex">
          <Box style={{ width: '50%', paddingRight: '5rem' }}>
            <Box display="flex" flexDirection="column">
              <h1>Name: {bundleResponse.data.tagBundleById.name}</h1>
              <TextareaAutosize
                style={{ marginTop: '2rem', width: '100%' }}
                aria-label="minimum height"
                minRows={6}
                placeholder="Description bundle"
                onChange={handleChangeTextArea}
                disabled={creatorId !== profileId}
                value={description}
                onBlur={() => {
                  handleEditDescription(bundleId, description)
                  /*nie chce sie setnac description */
                }}
              />
            </Box>
          </Box>
          <Box>
            <Button
              onClick={() => {
                setPage(1)
                /* TO DO tutaj routing do /bundles */
              }}
            >
              <CancelIcon fontSize="large" color="error" />
            </Button>
            <Box display="flex" flexDirection="column">
              {tagsResponse.data.tagPagination.items?.map((tag) => {
                return (
                  <p style={{ border: '2px solid blue', padding: '0.25rem' }}>
                    {tag.name}
                  </p>
                )
              })}
              <Stack spacing={2}>
                <Pagination
                  variant="outlined"
                  shape="rounded"
                  count={Math.ceil(tagsResponse.data.tagPagination.count / 10)}
                  page={page}
                  onChange={handleChange}
                />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default BundleDetails
