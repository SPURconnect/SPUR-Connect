import { useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

// MUI imports
import { TextField, Box, Button, Modal, Grid, Paper } from '@mui/material';
// MUI style for modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MessageSendModal({ buttonText, sendTo }) {
  //HOOKS
  const dispatch = useDispatch();
  //Modal Stuff
  const [open, setOpen] = useState(false);
  // handles the opening and closing of the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //Local State
  const [message, setMessage] = useState('');

  // POSTs a message to another user and handles the closing of the modal
  const handleSendMessage = () => {
    let outboundMessage = {
      content: message,
      timestamp: new Date(),
      recipient_id: sendTo
    }
    dispatch({
      type: "POST_MESSAGE",
      payload: outboundMessage
    })
    setMessage('');
    toast.success(`Message Sent!`)
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          color: 'white'
        }}
        color="primary"
        size="small"
        onClick={handleOpen}
      > {buttonText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-start-new-convo"
        aria-describedby="modal-start-new-convo"
      >

        <Box sx={style}>
          <Grid container style={{ Paper }}>

            <Grid item xs={1} />

            <Grid item xs={10}
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              <TextField
                fullWidth
                multiline
                minRows={6}
                variant="outlined"
                label="Break the ice!"
                formlabel="Conversation Starter"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>

            <Grid item xs={1} />

            <Grid item xs={3} />

            <Grid item align='center' xs={6}
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => handleSendMessage()}
              > Send
              </Button>
            </Grid>
            <Grid item xs={3} />

          </Grid>

        </Box>
      </Modal>
    </div>
  )
}