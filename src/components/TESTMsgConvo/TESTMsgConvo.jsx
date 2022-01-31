import react, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TESTMsgCompon from '../TESTMsgCompon/TESTMsgCompon';
import TESTMessages from '../TESTMessages/TESTMessages';

//MUI
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';

import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FaceIcon from '@mui/icons-material/Face';
///// End MUI Stuff


export default function TESTMsgConvo() {
  //alias HOOKs
  const dispatch = useDispatch();
  //REDUX store
  const userMessages = useSelector((store) => store.messagesReducer);
  

  useEffect(() => {
    dispatch({
      type: "FETCH_MESSAGES"
    })
  }, [])

  return(
    <>
      <List>

          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <MoreVertIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FaceIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Someone McSomeberson"
              secondary="30 char of recent message"
            />
          </ListItem>

          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <MoreVertIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FaceIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Someone McSomeberson"
              secondary="30 char of recent message"
            />
          </ListItem>

      </List>
    </>
  )
}