import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, } from '@mui/material';
import MeetingPhotosItem from '../MeetingPhotosItem/MeetingPhotosItem.jsx';
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone';
import MeetingNavBar from '../MeetingNavBar/MeetingNavBar';

//https://api.cloudinary.com/v1_1/${cloudName}/upload

function MeetingPhotos() {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  // const [inputPhoto, setInputPhoto] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const photos = useSelector((store) => store.photos);


  useEffect(() => {
    fetchPhotos();
  }, []);

  function fetchPhotos() {
    dispatch({
      type: 'FETCH_PHOTOS',
      payload: params.id
    })
  };

  
  function handleAddPhoto(inputPhoto){
    if(inputPhoto != ''){
      console.log('inputPhoto: ', inputPhoto);
      dispatch({
        type: 'ADD_PHOTO',
        payload: {image: inputPhoto, id: params.id}
      });
    };
  };

  return (
    <div>
      <MeetingNavBar prop={'photos'} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 1}}
      >
        <button onClick={() => setDialogOpen(true)}>Upload</button>
        <DropzoneDialog
        acceptedFiles={['image/*']}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={(files) => {
          console.log('Files:', files[0]);
          setDialogOpen(false);
          handleAddPhoto(files[0]);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
        <input 
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => setInputPhoto(e.target.files[0])}
        >
        </input>
        {/* <DropzoneArea
          acceptedFiles={['image/*']}
          dropzoneText={"Drag and drop an image here or click"}
          onChange={(files) => setInputPhoto(files)}
          sx={{}}
        /> */}
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
          Submit
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