import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import AllBundles from '../components/AllBundles/AllBundles'
import ActiveBundles from '../components/ActiveBundles/ActiveBundles'

const BundlesSettings = () => {
  return (
    <Box sx={{ flexGrow: 1 }} display="flex">
      <Grid xs={10} md={6}>
        <AllBundles />
      </Grid>
      <Grid xs={10} md={6}>
        <ActiveBundles />
      </Grid>
    </Box>
  )
}

export default BundlesSettings
