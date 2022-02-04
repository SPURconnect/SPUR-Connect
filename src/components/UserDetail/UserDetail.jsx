import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import { Box, Button, TextField, Typography, ListItemAvatar, Avatar } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';


function UserDetail ({profile}){
  const history = useHistory();
  const dispatch = useDispatch(); 

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({
      type: 'SAGA_FETCH_PROFILE_TO_EDIT',
      payload: user.id
    })
  }, [user.id])

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

  const setAvailability = (event) => {
    event.preventDefault();
    dispatch({
      type: "SAGA_EDIT_PROFILE_AVAILABILITY",
      payload: { availability: !profile.availability }
    });
  }

  const setSwitch = () => {
    if (profile.availability) {
      return <Switch 
        defaultChecked
        inputProps={{ 'aria-label': 'ant design' }} />
    }
    else {
      return <Switch 
        inputProps={{ 'aria-label': 'ant design' }} />
    }
  }

  return(
    <div>
      <ListItemAvatar>
        <Avatar 
        sx={{ width: 200, height: 200 }}
        src={profile.photo} />
      </ListItemAvatar>
      <h3>{profile.first_name}  {profile.last_name}</h3>
      <ul>
        <li>{profile.location_city}, {profile.location_state}</li>
        <li>{profile.industry_name} </li>
        <li>{profile.email}</li>
        <li>{profile.linkedin}, {profile.twitter}, {profile.instagram}, {profile.youtube}, {profile.facebook}</li>
        <li>{profile.portfolio}</li>
        <li>{profile.about_me}</li>
      </ul>
      <FormGroup onChange={(event) => setAvailability(event)}>
        <Stack direction="row" spacing={1} alignItems="center">
          <h3>Availability</h3>
          {setSwitch()}
        </Stack>
      </FormGroup>

    <div>
        <Button
          variant="contained"
          onClick={()=> history.push(`/edit/${profile.id}`)}
        >
          Edit Profile Information
        </Button>
    </div>
    </div>
  )
}

export default UserDetail;