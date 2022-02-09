import react, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MessagesMenu from '../MessagesMenu/MessagesMenu';
// import MessagesMsg from '../MessagesMsg/MessagesMsg';
// import MessagesConvo from '../MessagesConvo/MessagesConvo';

//MUI
import { Grid, Typography, Card, CardHeader, List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

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

  const stopPropAndNav = (e) => {
    
  }

  return(
    <>
    <Grid container maxHeight="88%" sx={{marginTop: '10px'}}>
      <Grid item xs={.5}/>
      
      <Grid item xs={11}>
        <div style={{ py: '10px' }}>
        {conversations?.length > 0 ?
          conversations.map(convo => {
            return <Card 
              sx={{ maxWidth: '100%', boxShadow: 3, paddingBottom: '12px', my: '4px', mx: '3px' }} 
              key={convo.uniqUser}
              >
                <CardHeader
                  sx={{ paddingBottom: '0px' }}
                  onClick={(e) => {history.push(`/messages/convo/${convo.uniqUser}`)}}
                  action={
                      <IconButton onClick={(e) => {e.stopPropagation()}} >
                        {/* Add onClick options//delete functionality */}
                        <MessagesMenu />
                      </IconButton>
                    }
                  avatar={
                    
                    <Avatar
                      sx={{ width: '45px', height: '45px' }}
                      aria-label="profile image"
                      onClick={(e) => {e.stopPropagation(); history.push(`/searchProfiles/${convo.uniqUser}`)}}
                      src={profiles.filter(prof => 
                            (prof.id == convo.uniqUser)).map(profile => {
                              return `${profile.photo}`
                            })}
                    />
                  }
                  title={profiles.filter(prof => (prof.id == convo.uniqUser)).map(profile => {
                    return `${profile.first_name} ${profile.last_name}`
                  })}
                  subheader={convo.messages[convo.messages.length - 1].content.slice(0, 35)}
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
      </Grid>
      <Grid item xs={.5}/>
    </Grid>

    </>
  )
}