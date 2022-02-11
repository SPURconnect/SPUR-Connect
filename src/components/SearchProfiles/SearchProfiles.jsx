import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
  mt: '20%',
};

function SearchProfiles(props) {

  const store = useSelector((store) => store);
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  const searchProfilesReducer = useSelector(store => store.searchProfilesReducer);
  const industriesReducer = useSelector(store => store.industriesReducer);
  const user = useSelector(store => store.user);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch({
      type: 'FETCH_INDUSTRIES'
    })
  }, []);

  const handleQueryChange = (event) => {
    event.preventDefault();
    if (event.target.value === '') {
      dispatch({
        type: 'CLEAR_PROFILES'
      })
    }
    else {
      dispatch({
        type: 'FETCH_PROFILES',
        payload: event.target.value
      })
    }
  };


  const handleCardClick = (profile) => {
    history.push(`/searchProfiles/${profile.user_id}`)
  };

  const ifNoSearch = () => {
    if (searchProfilesReducer.length === 0) {
      return <p className="justBeCentered" style={{padding: '15vh 20vw', opacity: '60%'}}>There's nothing here!<br /><br /> Try searching for potential connections.</p>
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
          sx={{ width: '84%', backgroundColor: 'white' }}
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
              <h4>Search Help</h4>
              <p>Search by first or last name:<br />
                Ex: "John" "Smith"<br /><br />
                Search by location (city, state, or ZIP):<br />
                Ex: "Minneapolis" "Minnesota" "55407"<br /><br />
                Search by industry name:<br />
                Ex: "Software Engineer" "Agriculture"<br /><br />
                *By default all searches are sorted by industry, then last name.
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

      <Grid
        container
        maxHeight='85%'
        style={{ paddingTop: '2vh' }}
      >
        <Grid item xs={.5} />
        <Grid item xs={11}>
          {searchProfilesReducer.map((item) => {
            if (item.user_id === user.id) {
              return <div key={item.user_id}></div>
            } else {
              return (
                <Card
                  key={item.user_id}
                  sx={{ maxWidth: '100%', boxShadow: 3, marginBottom: '4px' }}
                  onClick={() => handleCardClick(item)}
                >
                  <CardHeader
                    sx={{ paddingBottom: '12px' }}
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
              )
            }
          })}
        </Grid>
        <Grid item xs={.5} />
      </Grid>
    </div>
  );
}

export default SearchProfiles;

