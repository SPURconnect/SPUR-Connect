import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';

function SearchProfiles(props) {
 
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');
  const dispatch = useDispatch();
  const searchProfilesReducer = useSelector(store => store.searchProfilesReducer);
  const industriesReducer = useSelector(store => store.industriesReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_INDUSTRIES' })
  }, []);

  const handleQueryChange = (event) => {
    let cleanString = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);
    event.preventDefault();
    if (event.target.value === '')  {
      dispatch({
        type: 'CLEAR_PROFILES'
      })
    }
    else  {
    dispatch({
      type: 'FETCH_PROFILES',
      payload: cleanString
      })
    }
  };

  const handleIndustryChange = (event) =>  {
    event.preventDefault();
    dispatch({
      type: 'SORT_BY_INDUSTRY',
      payload: event.target.value
    });
  };

  const handleCardClick = (event) =>  {
    // TODO: history.push() to user profile 
  };

  return (
    <div>
      <input onChange={(event) => handleQueryChange(event)}></input>
      <select onChange={(event) => handleIndustryChange(event)}>
        <option disabled>Filter By Industry</option>
        {industriesReducer.map((industry) =>  {
            return  (
              <option key={industry.id} value={industry.id}>{industry.industry_name}</option>
            )
        })}
      </select>
        
      {searchProfilesReducer.map((item, index) =>    
        <div 
          onClick={() => handleCardClick(item)}
          style={{ paddingBottom: '4px' }}>
          <Card 
            sx={{ maxWidth: '100%', boxShadow: 3 }} 
            
            >
            <CardHeader
              sx={{ paddingBottom: '0px' }}
              // onClick={handleExpandClick}
              avatar={
                <Avatar
                  sx={{ bgcolor: grey[500], width: '75px', height: '75px' }}
                  aria-label="profile image"
                  src={item.photo}
                >
                </Avatar>
              }
              title={item.first_name + ' ' + item.last_name}
              subheader={item.industry_name}
            />             
          </Card>
        </div>
      )}
    </div>
  );
}

export default SearchProfiles;

