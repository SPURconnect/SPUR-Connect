import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, Backdrop, Grid} from '@mui/material';
import MeetingPhotosItem from '../MeetingPhotosItem/MeetingPhotosItem.jsx';
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone';
import MeetingNavBar from '../MeetingNavBar/MeetingNavBar';
import './MeetingPhotos.css';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

//https://api.cloudinary.com/v1_1/${cloudName}/upload

function MeetingPhotos() {


  const history = useHistory();

  const dispatch = useDispatch();
  const params = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const photos = useSelector((store) => store.photos);
  const useStyles = makeStyles(theme => createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
  }));
  const classes = useStyles();

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
          previewGridProps={{container: { spacing: 'center', direction: 'row' }}}
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
      <Grid container maxHeight="88%" sx={{mt: 2}}>
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