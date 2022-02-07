import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, CardMedia, CardContent, CardActions, Typography} from '@mui/material';


function MeetingPhotosItem({photo}) {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  const openInNewTab = () => {
    const newWindow = window.open(photo.image_url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  function handleDeleteButton(){
    dispatch({
      type: 'DELETE_PHOTO',
      payload: {id: photo.id, paramsid: params.id}
    })
  }

  function handleCardClick(){
    history.push()
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ maxWidth: 450 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={photo.image_url}
            alt="Open Full Size Image"
            onClick={openInNewTab}
          />
          {/* <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Image Title?
            </Typography>
          </CardContent> */}
        </CardActionArea>
        <CardActions>
          <Button size="small" color="error" variant="contained" onClick={handleDeleteButton} sx={{ml: 3.2}}> 
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
};

export default MeetingPhotosItem;