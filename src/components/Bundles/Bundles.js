import React from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Loader from '../Loader'
import useGetAllBundles from '../../graphql/queries/useGetAllBundles/useGetAllBundles'

const Bundles = () => {
    const { data, loading, error } = useGetAllBundles()

    if (loading) return <Loader />
    if (error) return <div>Error :(</div>

    return (
        <div>
            <h1>My bundles</h1>
            {data.map((bundle) => {
                return (
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label={bundle.name}
                        />
                    </FormGroup>
                )
            })}
        </div>
    )
}

export default Bundles
