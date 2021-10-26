import * as React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TagIcon from '@mui/icons-material/Tag'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { Divider } from '@mui/material'
import { Link } from 'react-router-dom'

const MenuItems = () => {
  const handleLogout = () => {
    localStorage.removeItem('user-name')
  }

  return (
    <div>
      <Link to="/">
        <ListItem button>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
      </Link>

      <Link to="/bundles">
        <ListItem button>
          <ListItemIcon>
            <TagIcon />
          </ListItemIcon>
          <ListItemText primary="Bundle" />
        </ListItem>
      </Link>

      <Link to="/settings">
        <ListItem button>
          <ListItemIcon>
            <SettingsSuggestIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </Link>
      <Divider />
      <Link to="/login">
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Link>
    </div>
  )
}

export default MenuItems
