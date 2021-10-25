import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Container, Tab, TextareaAutosize } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { detailsModalState } from '../../context/detailsModalOpen'
import useGetBundleById, {
  GET_BUNDLE_BY_ID,
} from '../../graphql/queries/useGetBundleById'
import useGetTagsByBundleId, {
  GET_TAGS_BY_ID,
} from '../../graphql/queries/useGetTagsByBundleId'
import Loader from '../Loader/Loader'
import { useApolloClient, useQuery } from '@apollo/client'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const BundleDetails = () => {
  const [page, setPage] = useState(1)
  const [tags, setTags] = useState([])

  const [bundleDescription, setBundleDescription] = useState('')
  detailsModalState()
  const bundleResponse = useQuery(GET_BUNDLE_BY_ID, {
    variables: {
      // _id: bundleId,
      _id: '605bb7a80d74c124378744d1',
    },
  })

  const tagsResponse = useQuery(GET_TAGS_BY_ID, {
    variables: {
      // _id: bundleId,
      filter: '605bb7a80d74c124378744d1',
      page: page,
    },
  })

  const handleChange = (event, value) => {
    setPage(value)
    tagsResponse.fetchMore({
      variables: {
        filter: '605bb7a80d74c124378744d1',
        page: page,
      },
    })
  }

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
