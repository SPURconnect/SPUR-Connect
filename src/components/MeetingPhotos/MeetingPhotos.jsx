import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid} from '@mui/material';
import MeetingPhotosItem from '../MeetingPhotosItem/MeetingPhotosItem.jsx';
import { DropzoneDialog } from 'material-ui-dropzone';
import MeetingNavBar from '../MeetingNavBar/MeetingNavBar';
import { createStyles, makeStyles } from '@material-ui/core/styles';

//https://api.cloudinary.com/v1_1/${cloudName}/upload

function MeetingPhotos() {
  // hooks being used
  const dispatch = useDispatch();
  const params = useParams();
  // reducers being used
  const photos = useSelector((store) => store.photos);
  // pieces of state being used
  const [dialogOpen, setDialogOpen] = useState(false);
  // sets a style for the preview of the dropzone
  const useStyles = makeStyles(theme => createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
  }));
  const classes = useStyles();

  // on component load fetches the photos of a users meeting based on params
  useEffect(() => {
    fetchPhotos();
  }, []);

  function fetchPhotos() {
    dispatch({
      type: 'FETCH_PHOTOS',
      payload: params.id
    })
  };

  // handles the adding of photos to a meeting, if the file not an empty string it
    // dispatches the information from the dropzone dialog
  function handleAddPhoto(file) {
    if (file != '') {
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
        sx={{mt: 2}}
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
          showPreviews={true}
          showPreviewsInDropzone={false}
          useChipsForPreview={true}
          filesLimit={1}
          previewGridProps={{container: { direction: 'row' }}}
          previewChipProps={{classes: { root: classes.previewChip } }}
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
      />
      </Box>
      <Grid container spacing={1} maxHeight="88%" mt={2} sx={{padding: '10px'}}>
      {photos.map((photo) =>{
        return(
          <Grid item xs={6} key={photo.id}>
            <MeetingPhotosItem photo={photo} />
          </Grid>
        )
      })}
      </Grid>
    </div>
  )
};

export default MeetingPhotos;