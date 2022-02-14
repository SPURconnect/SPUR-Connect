import * as React from 'react';

import { Menu, MenuItem}  from '@mui/material/';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function MessagesMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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