import * as React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TagIcon from '@mui/icons-material/Tag';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Divider } from '@mui/material';
export const menuItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <TagIcon />
            </ListItemIcon>
            <ListItemText primary="Bundle" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <SettingsSuggestIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItem>
        <Divider />
        <ListItem button>
            <ListItemIcon>
                <ExitToAppIcon color="error"/>
            </ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItem>

      
    </div>
)
