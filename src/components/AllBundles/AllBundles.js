import React from 'react'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Loader from '../Loader'
import { Box } from '@mui/system'
import useGetAllBundles from '../../graphql/queries/useGetAllBundles'
import { Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useMutation } from '@apollo/client'
import { GET_ACTIVE_BUNDLES } from '../../graphql/queries/useGetActiveBundles'
import { ASSIGN_BUNDLE } from '../../graphql/mutations/assignBundleById'
import cogoToast from 'cogo-toast'

const AllBundles = () => {
  const [assignBundle] = useMutation(ASSIGN_BUNDLE, {
    refetchQueries: [GET_ACTIVE_BUNDLES, 'GetActiveBundles'],
  })

  const handleAssignBundle = (bundleId) => {
    assignBundle({
      variables: {
        bundleId: bundleId,
      },
    })
  }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: theme.palette.text.secondary,
    color: 'white',
    marginBottom: '20px',
  }))

  const { data, loading, error } = useGetAllBundles()

  if (loading) return <Loader />
  if (error) return <div>Error :(</div>

  return (
    <div>
      <h1>All bundles</h1>
      {data.map((bundle) => {
        return (
          <Box key={bundle._id}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Item>{bundle.name}</Item>
              <Button
                variant="text"
                color="success"
                onClick={() => {
                  handleAssignBundle(bundle._id)
                  cogoToast.success(`Tag bundle ${bundle.name} was assigned.`)
                }}
              >
                <AddCircleIcon />
              </Button>
            </Stack>
          </Box>
        )
      })}
    </div>
  )
}

export default AllBundles
