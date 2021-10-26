import React from 'react'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Loader from '../Loader'
import { Box } from '@mui/system'
import { Button, Container } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import useGetAllBundles from '../../graphql/queries/useGetAllBundles'
import { addModalState } from '../../context/addModalOpen'
import { detailsModalState } from '../../context/detailsModalOpen'

const BundlesListWithAdding = () => {
  const { setIsAddModalOpen } = addModalState()

  const Item = styled(Button)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#1796e6',
    color: 'white',
    marginBottom: '20px',
    minWidth: '12rem',
    textTransform: 'none',
  }))

  const { data, loading, error } = useGetAllBundles()
  const { setIsDetailsModalOpen, setBundleId } = detailsModalState()

  if (loading) return <Loader />
  if (error) return <div>Error :(</div>

  return (
    <Container>
      <h1>Bundles (click for detail)</h1>
      <Box display="flex" flexWrap="wrap">
        {data.map((bundle) => {
          return (
            <Box key={bundle._id} marginX="0.5rem">
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <Item
                  onClick={() => {
                    setIsDetailsModalOpen(true)
                    setBundleId(bundle._id)
                  }}
                >
                  {bundle.name}
                </Item>
              </Stack>
            </Box>
          )
        })}
      </Box>
      <Box display="flex" justifyContent="end">
        <Button
          onClick={() => {
            setIsAddModalOpen(true)
          }}
        >
          <AddCircleIcon fontSize="large" />
        </Button>
      </Box>
    </Container>
  )
}

export default BundlesListWithAdding
