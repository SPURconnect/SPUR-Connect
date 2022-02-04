import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, } from '@mui/material';
//https://api.cloudinary.com/v1_1/${cloudName}/upload



function MeetingPhotos() {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const [inputPhoto, setInputPhoto] = useState('');

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
          onChange={(e) => setInputPhoto(e.target.files[0])}
        >
       </input>
      </Box>
      {/* map through photos for <MeetingPhotoItem />*/}
    </div>
  )
};

export default MeetingPhotos;