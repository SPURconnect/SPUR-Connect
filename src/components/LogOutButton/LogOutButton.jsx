import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

function LogOutButton(props) {
  // hooks being used
  const dispatch = useDispatch();

  // when the logout button is hit logs the user out and clears the meetings reducer
  const handleLogOut = () => {
    dispatch({ type: 'LOGOUT' });
    dispatch({ type: 'CLEAR_MEETINGS' });
  }

  return (
    <Button
      variant='contained'
      size='small'
      color='primary'
      onClick={() => handleLogOut()}
      sx={{
        color: 'white'
      }}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
