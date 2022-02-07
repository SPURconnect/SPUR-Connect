import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, CardMedia, CardContent, CardActions, Typography} from '@mui/material';


function MeetingPhotosItem({photo}) {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  function handleDeleteButton(){
    dispatch({
      type: 'DELETE_PHOTO',
      payload: photo.id //TODO: Pass Params for FETCH_PHOTOS on return.
    })
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
            // alt=""
          />
          <CardContent>
            {/* <Typography gutterBottom variant="h5" component="div">
              Image Title?
            </Typography> */}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="secondary" variant="contained" onClick={handleDeleteButton}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
};

export default MeetingPhotosItem;