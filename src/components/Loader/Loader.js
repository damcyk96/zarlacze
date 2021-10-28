import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { Container } from '@mui/material'
const Loader = () => {
  return (
    <Container width="100%" >
      <Box
        display="flex"
        width="100%"
        justifyContent="center"
        alignItems="center"
        height="50rem"
      >
        <CircularProgress />
      </Box>
    </Container>
  )
}

export default Loader
