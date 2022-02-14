import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Card, CardActionArea, CardMedia, MenuItem, Menu} from '@mui/material';
import toast from 'react-hot-toast';


function MeetingPhotosItem({photo}) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openInNewTab = () => {
    const newWindow = window.open(photo.image_url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
    handleClose();
  };

  function handleDeleteButton(){
    dispatch({
      type: 'DELETE_PHOTO',
      payload: {id: photo.id}
    })
    toast.success(`Photo deleted!`);
    handleClose();
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{mt: 1}}
    >
      <Card sx={{ maxWidth: '100%', boxshadow: 3 }}>
        <CardActionArea>
          <CardMedia
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            component="img"
            height="140"
            image={photo.image_url}
            alt="Open Full Size Image"
            onClick={handleClick}
          />
        </CardActionArea>

      </Card>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={openInNewTab}>View Full Size</MenuItem>
        <MenuItem onClick={handleDeleteButton}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Cancel</MenuItem>
      </Menu>
    </Box>
  )
};

export default MeetingPhotosItem;
