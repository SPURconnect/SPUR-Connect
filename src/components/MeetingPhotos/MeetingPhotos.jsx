import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, } from '@mui/material';


function MeetingPhotos() {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    fetchPhotos();
  }, []);

  function fetchPhotos() {
    dispatch({
      type: 'FETCH_PHOTOS',
      payload: 1 //Use Params
    })
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          // onClick={handleAddPhoto}
        >
          Add Photo
        </Button>
      </Box>
      {/* map through photos for <MeetingPhotoItem />*/}
    </div>
  )
};

export default MeetingPhotos;