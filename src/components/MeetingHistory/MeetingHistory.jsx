import { Button, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import MeetingHistoryItem from '../MeetingHistoryItem/MeetingHistoryItem';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useHistory } from 'react-router-dom';

function MeetingHistory() {
  const dispatch = useDispatch();
  const history = useHistory();
  const meetings = useSelector((store) => store.meetings);

  return (
    <div>
      <IconButton
        size='large'
        sx={{width: '100%', margin: 'auto', paddingTop: '4vh'}}
        onClick={() => history.push('/meeting/add')}
      >
        <AddBoxIcon 
          fontSize='inherit'
        />
      </IconButton>
      {meetings?.length > 0 && meetings?.map((item) => {
        return (
          <>
            <MeetingHistoryItem key={item.id} item={item} />
          </>
        )
      })}
    </div>
  )
}

export default MeetingHistory;