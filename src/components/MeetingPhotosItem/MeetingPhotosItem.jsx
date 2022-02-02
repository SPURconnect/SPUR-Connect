import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, } from '@mui/material';


function MeetingPhotosItem() {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  return (
    <div>
      {/* https://mui.com/components/cards/ */}
    </div>
  )
};

export default MeetingPhotosItem;