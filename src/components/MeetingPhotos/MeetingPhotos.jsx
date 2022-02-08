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


  function handleAddPhoto(file) {
    if (file != '') {
      console.log('inputPhoto: ', file);
      dispatch({
        type: 'ADD_PHOTO',
        payload: { image: file, id: params.id }
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
        sx={{ mt: 1 }}
      >
        <Button
          variant="contained"
          onClick={() => setDialogOpen(true)}
          sx={{
            color: 'white'
          }}
        >
          Upload
        </Button>
        <DropzoneDialog
          acceptedFiles={['image/*']}
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          maxFileSize={5000000}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={(files) => {
            setDialogOpen(false);
            handleAddPhoto(files[0]);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
      </Box>
      {photos.map((photo) => {
        return (
          <MeetingPhotosItem key={photo.id} photo={photo} />
        )
      })}
    </div>
  )
};

export default MeetingPhotos;