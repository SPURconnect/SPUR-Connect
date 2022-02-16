import * as React from 'react';

import { Menu, MenuItem}  from '@mui/material/';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// this component was never finished, you'll have to wire the go to profile and 
  // the deleting of the conversation. If you delete a conversation you'll have
  // to decide if you want to delete from both users or just one and how to handle 
  // that in the database

export default function MessagesMenu() {
  // piece of state being used
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // handles the opening and closing of the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MoreVertIcon
        id="messages-menu-button"
        aria-controls={open ? 'messages-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </MoreVertIcon>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Go to User</MenuItem>
        <MenuItem disabled>Delete Convo</MenuItem>
      </Menu>
    </div>
  );
}