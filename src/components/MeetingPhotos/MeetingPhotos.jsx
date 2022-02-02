import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, } from '@mui/material';
import {} from "@cloudinary/url-gen";
import PhotosUploaderContainer from '../PhotoUploader/PhotoUploader';

//https://api.cloudinary.com/v1_1/${cloudName}/upload

function MeetingPhotos() {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const [inputPhoto, setInputPhoto] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  function fetchPhotos() {
    dispatch({
      type: 'FETCH_PHOTOS',
      payload: 1 //Use Params
    })
  };

  
  function handleAddPhoto(){
    if(inputPhoto != null){
      console.log(inputPhoto);
      dispatch({
        type: 'ADD_PHOTO',
        payload: inputPhoto
      });
      // setInputPhoto(null);
    };
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
          onClick={handleAddPhoto}
        >
          Add Photo
        </Button>
        <input 
          type="file"
          accept="image/png, image/jpeg"
          onChange={e => setInputPhoto(e.target.value)}
        >
       </input>
      </Box>
      {/* map through photos for <MeetingPhotoItem />*/}
    </div>
  )
};

export default MeetingPhotos;