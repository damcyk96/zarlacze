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
import { Button } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { UNASSIGN_BUNDLE } from '../../graphql/mutations/unAssignBundleByid'
import { useMutation } from '@apollo/client'

const ActiveBundles = () => {
    const [unassignBundle] = useMutation(UNASSIGN_BUNDLE, {
        refetchQueries: [GET_ACTIVE_BUNDLES, 'GetActiveBundles'],
    })

    const handleUnassignBundle = (bundleId) => {
        unassignBundle({
            variables: {
                bundleId: bundleId,
            },
        })
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: '#66c429',
        color: 'white',
        marginBottom: '20px',
    }))

    const { data, loading, error } = useGetActiveBundles()

    if (loading) return <Loader />
    if (error) return <div>Error :(</div>

    return (
        <div>
            <h1 style={{ color: '#66c429' }}>Active bundles</h1>
            {data.map((bundle) => {
                return (
                    <Box key={bundle._id}>
                        <Stack
                            direction="row"
                            divider={
                                <Divider orientation="vertical" flexItem />
                            }
                            spacing={2}
                        >
                            <Item>{bundle.name}</Item>
                            <Button
                                variant="text"
                                color="error"
                                onClick={() => {
                                    handleUnassignBundle(bundle._id)
                                }}
                            >
                                <HighlightOffIcon />
                            </Button>
                        </Stack>
                    </Box>
                )
            })}
        </div>
    )
}

export default ActiveBundles
