import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Container, TextareaAutosize } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { detailsModalState } from '../../context/detailsModalOpen'
import { GET_BUNDLE_BY_ID } from '../../graphql/queries/useGetBundleById'
import { GET_TAGS_BY_ID } from '../../graphql/queries/useGetTagsByBundleId'
import Loader from '../Loader/Loader'
import { useQuery } from '@apollo/client'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { GET_PROFILE } from '../../graphql/queries/useGetProfile'

const BundleDetails = () => {
  const [page, setPage] = useState(1)
  const [profileId, setProfileId] = useState('')
  const [creatorId, setCreatorId] = useState('')
  const userData = useQuery(GET_PROFILE)

  const [bundleDescription, setBundleDescription] = useState('')
  detailsModalState()
  const bundleResponse = useQuery(GET_BUNDLE_BY_ID, {
    variables: {
      // _id: bundleId,
      _id: '6176e9a21322518c90158ad1',
    },
  })

  const tagsResponse = useQuery(GET_TAGS_BY_ID, {
    variables: {
      // _id: bundleId,
      filter: '6176e9a21322518c90158ad1',
      page: page,
    },
  })

  const handleChange = (event, value) => {
    setPage(value)
    tagsResponse.fetchMore({
      variables: {
        filter: '6176e9a21322518c90158ad1',
        page: page,
      },
    })
  }
  useEffect(() => {
    if (userData.data && bundleResponse.data) {
      setProfileId(userData.data.getProfile._id)
      if (bundleResponse.data.tagBundleById.creator != null) {
        setCreatorId(bundleResponse.data.tagBundleById.creator._id)
      } else {
        setCreatorId(null)
      }
    }
  }, [userData.data, bundleResponse.data])

  console.log(creatorId)

  if (bundleResponse.loading || tagsResponse.loading) return <Loader />

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
                onChange={(e) => setBundleDescription(e.target.value)}
                disabled={creatorId !== profileId}
              >
                {bundleResponse.data.tagBundleById.description}
              </TextareaAutosize>
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
