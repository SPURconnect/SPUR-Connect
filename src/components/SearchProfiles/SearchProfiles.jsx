import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import { InputAdornment, Box, Grid, Typography, Modal, IconButton, Paper } from '@mui/material';
import './SearchProfiles.css';

const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 4,
};

function SearchProfiles(props) {
 
  const store = useSelector((store) => store);
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  const searchProfilesReducer = useSelector(store => store.searchProfilesReducer);
  const industriesReducer = useSelector(store => store.industriesReducer);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch({ 
      type: 'FETCH_INDUSTRIES' 
    })
    return () =>  {
      dispatch({
        type: 'CLEAR_PROFILES'
      })
    }
  }, []);

  const handleQueryChange = (event) => {
    event.preventDefault();
    if (event.target.value === '')  {
      dispatch({
        type: 'CLEAR_PROFILES'
      })
    }
    else  {
    dispatch({
      type: 'FETCH_PROFILES',
      payload: event.target.value
      })
      // dispatch({
      //   type: 'SORT_BY_INDUSTRY',
      //   payload: selected
      // });
    }
  };

  // const handleIndustryChange = (event) =>  {
  //   event.preventDefault();
  //   setSelected(event.target.value);
  //   dispatch({
  //     type: 'SORT_BY_INDUSTRY',
  //     payload: event.target.value
  //   });
  // };

  const handleCardClick = (profile) =>  {
    history.push(`/searchProfiles/${profile.id}`) 
  };

  const ifNoSearch = () =>  {
    if (searchProfilesReducer.length === 0) {
      return <p className="justBeCentered">There's nothing here!<br /><br /> Try searching for potential connections.</p>
    }
    else {
      return;
    }
  }

  

  return (
    <div>

      <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          // minHeight="0vh"
          sx={{ mt: 3 }}
        >
        <TextField 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          sx={{width: '90%'}}
          type="text"  
          onChange={(event) => handleQueryChange(event)} 
          variant="outlined"
          size="small"
          placeholder='Search by industry, name, or location'
          />
          <IconButton 
            variant="contained"
            color="primary"
            size="small"
            onClick={handleOpen}
          ><InfoIcon /></IconButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="search-info"
            aria-describedby="search-info"
          >
          <Box sx={style}>
            <div className="modalDiv">
              <h4>Help</h4>
              <p>Search by first or last name:<br />
              Ex: "John" "Smith"<br /><br />
              Search by location(city, state, or ZIP):<br />
              Ex: "Minneapolis" "Minnesota" "55407"<br /><br />
              Search by industry name:<br />
              Ex: "Software Engineer" "Agriculture"
              </p>      
            </div>
          
          </Box>
        </Modal>
      </Box>
      {/* <select controlled value={selected} onChange={(event) => handleIndustryChange(event)}>
        <option value={0}>Filter By Industry</option>
        {industriesReducer.map((industry) =>  {
            return  (
              <option key={industry.id} value={industry.id}>{industry.industry_name}</option>
            )
        })}
      </select> */}
      
        {ifNoSearch()}
        
      {searchProfilesReducer.map((item, index) =>    
        <div 
          key={item.id}
          onClick={() => handleCardClick(item)}
          style={{ paddingBottom: '4px' }}>
          <Card 
            sx={{ maxWidth: '100%', boxShadow: 3 }} 
            >
            <CardHeader
              sx={{ paddingBottom: '0px' }}
              avatar={
                <Avatar
                  sx={{ bgcolor: grey[500], width: '75px', height: '75px' }}
                  aria-label="profile image"
                  src={item.photo}
                >
                </Avatar>
              }
              title={item.first_name + ' ' + item.last_name}
              subheader={item.industry_name + ' - ' + item.location_city + ', ' + item.location_state}
            />             
          </Card>
        </div>
      )}
    </div>
  );
}

export default SearchProfiles;

