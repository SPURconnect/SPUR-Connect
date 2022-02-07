import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, } from '@mui/material';
import {} from "@cloudinary/url-gen";
import MeetingPhotosItem from '../MeetingPhotosItem/MeetingPhotosItem.jsx';

function MeetingPhotos() {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const [inputPhoto, setInputPhoto] = useState('');
  const photos = useSelector((store) => store.photos);

  useEffect(() => {
    fetchPhotos();
  }, []);

  function fetchPhotos() {
    dispatch({
      type: 'FETCH_PHOTOS',
      payload: 5 //TODO: Replace "5" with useParams for current selected meeting.
    })
  };

  
  function handleAddPhoto(){
    if(inputPhoto != ''){
      console.log(inputPhoto);
      dispatch({
        type: 'ADD_PHOTO',
        payload: {image: inputPhoto, id: 5} //TODO: Replace "5" with useParams for current selected meeting.
      });
    };
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 1}}
      >
        <input 
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => setInputPhoto(e.target.files[0])}
        >
       </input>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 1}}
      >
        <Button
          variant="contained"
          onClick={handleAddPhoto}
        >
          Add Photo
        </Button>
      </Box>
      {photos.map((photo) =>{
        return(
            <MeetingPhotosItem key={photo.id} photo={photo} />
        )
      })}
    </div>
  )
};

export default MeetingPhotos;