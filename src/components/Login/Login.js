import * as React from 'react'
import {
  Button,
  TextField,
  CssBaseline,
  Paper,
  Link,
  Box,
  Grid,
  Typography,
} from '@mui/material'
import { useHistory } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import selleoBg from './../../assets/images/selleoBg.png'
import selleoLogo from './../../assets/images/selleoLogo.png'
import { UserContext } from '../../context/getNewClient'
// import { UserContext } from './context/getNewClient'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://selleo.com/">
        Selleo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function Login() {
  const [userName, setUserName] = React.useState('')
  const history = useHistory()
  const { setProviderStorage } = React.useContext(UserContext)

  const handleLogin = () => {
    localStorage.setItem('user-name', userName)
    setProviderStorage(userName)

    history.replace('/')
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* TO DO PATH */}

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${selleoBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* TO DO LINK */}
            <img
              src="https://i.ibb.co/2NnMsyy/pobrane.png"
              alt="selleoLogo"
              width="80%"
            />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(event) => setUserName(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!userName}
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Sign In
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
