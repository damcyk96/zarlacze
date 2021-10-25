import React from 'react'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Loader from '../Loader'
import { Box } from '@mui/system'
import useGetActiveBundles, {
  GET_ACTIVE_BUNDLES,
} from '../../graphql/queries/useGetActiveBundles'
import { Button, Container } from '@mui/material'
import { UNASSIGN_BUNDLE } from '../../graphql/mutations/unAssignBundleByid'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useMutation } from '@apollo/client'
import { modalState } from '../../context/modalOpen'

const BundlesListWithAdding = () => {
  const { handleOpen, isOpen, setIsOpen } = modalState()

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#1796e6',
    color: 'white',
    marginBottom: '20px',
    minWidth: '10rem',
  }))

  const { data, loading, error } = useGetActiveBundles()

  if (loading) return <Loader />
  if (error) return <div>Error :(</div>

  return (
    <Container>
      <Box>
        <h1>Bundles (click for detail)</h1>
        {data.map((bundle) => {
          return (
            <Box key={bundle._id}>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <Item>{bundle.name}</Item>
              </Stack>
            </Box>
          )
        })}
      </Box>
      <Box display="flex" justifyContent="end">
        <Button onClick={()=>{
         setIsOpen(true);
         console.log(isOpen)
        }}>
          <AddCircleIcon fontSize="large" />
        </Button>
      </Box>
    </Container>
  )
}

export default BundlesListWithAdding