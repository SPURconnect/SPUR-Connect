import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

function LogOutButton(props) {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch({ type: 'LOGOUT' });
    dispatch({ type: 'CLEAR_MEETINGS' });
  }

  return (
    <Button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      // className={props.className}
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
