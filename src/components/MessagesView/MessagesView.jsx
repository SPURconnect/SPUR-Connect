import react, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import MessagesMsg from '../MessagesMsg/MessagesMsg';
// import MessagesConvo from '../MessagesConvo/MessagesConvo';

//MUI
import { Typography, Card, CardHeader, List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { grey } from '@mui/material/colors';

///// End MUI Stuff


export default function MessagesView() {
  //alias HOOKs
  const dispatch = useDispatch();
  const history = useHistory();
  //REDUX store
  const conversations = useSelector((store) => store.messagesReducer);
  const profiles = useSelector((store) => store.allProfilesReducer);


  useEffect(() => {
    dispatch({
      type: "FETCH_MESSAGES"
    })
  }, [])

  return(
    <>
      <div style={{ paddingBottom: '4px' }}>
      {conversations?.length > 0 ?
        conversations.map(convo => {
          return <Card 
            sx={{ bgcolor: grey[500], maxWidth: '100%', boxShadow: 3, paddingBottom: '12px', my: '4px', mx: '3px' }} 
            >
              <CardHeader
                sx={{ paddingBottom: '0px' }}
                onClick={(e) => {history.push(`/messages/convo/${convo.uniqUser}`)}}
                action={
                    <IconButton  aria-label="options">
                      {/* Add onClick options//delete functionality */}
                      <MoreVertIcon />
                    </IconButton>
                  }
                avatar={
                  <Avatar
                    sx={{ width: '45px', height: '45px' }}
                    aria-label="profile image"
                    src={profiles.filter(prof => 
                          (prof.id == convo.uniqUser)).map(profile => {
                            return `${profile.photo}`
                          })}
                  />
                }
                title={profiles.filter(prof => (prof.id == convo.uniqUser)).map(profile => {
                  return `${profile.first_name} ${profile.last_name}`
                })}
                subheader={convo.messages[0].content.slice(0, 35)}
              />
            </Card>
          })
        :
          <Typography
            sx={{ padding: '30vh 20vw', opacity: '60%' }}
          >
            There are no conversations to display. Go break some ice!
          </Typography>
      }
      </div>

{/* CARD VS LIST */}

      <List>
        {conversations.map(convo => {
          return <ListItem
                  sx={{ 
                    bgcolor: grey[300], 
                    maxWidth: '100%', 
                    boxShadow: 3, 
                    paddingBottom: '12px', 
                    my: '4px', 
                    mx: '3px' 
                  }} 
                  key={convo.uniqUser}
                  onClick={(e) => {history.push(`/messages/convo/${convo.uniqUser}`)}}
                  secondaryAction={
                  <IconButton edge="end" aria-label="options">
                    <MoreVertIcon />
                  </IconButton>
                }>
              <ListItemAvatar>
                {profiles.filter(prof => (prof.id == convo.uniqUser)).map(profile => {
                  return <Avatar src={profile.photo}/>
                })}

              </ListItemAvatar>
              <ListItemText
                primary={profiles.filter(prof => (prof.id == convo.uniqUser)).map(profile => {
                  return `${profile.first_name} ${profile.last_name}`
                })}
                secondary={convo.messages[0].content.slice(0, 35)}
              />
            </ListItem>
          })}
      </List>

    </>
  )
}