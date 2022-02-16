import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

//MUI Stuff
import { Grid, MenuItem, Button, TextField, ListItemAvatar, Avatar } from '@mui/material';

function EditUserProfile() {
  // hooks being used
  const dispatch = useDispatch();
  const history = useHistory();
  // reducers being used
  const editProfile = useSelector((store) => store.editProfileReducer);
  const industries = useSelector((store) => store.industriesReducer);
  // pieces of state being used
  const [industry, setIndustry] = useState(editProfile.industry_id);

  // on clicking the edit button on a users profile will fetch the industries as well
    // as the users entire profile
  useEffect(() => {
    dispatch({
      type: 'SAGA_FETCH_PROFILE_TO_EDIT'
    })
    dispatch({
      type: 'FETCH_INDUSTRIES'
    })
  }, [])

  // after the user is done editing and hits save, will fire a dispatch to the server
    // to update their information in the database, then push them back to the profile
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SAGA_EDIT_PROFILE_INFO',
      payload: {
        email: editProfile.email,
        first_name: editProfile.first_name,
        last_name: editProfile.last_name,
        photo: editProfile.photo,
        facebook: editProfile.facebook,
        linkedin: editProfile.linkedin,
        twitter: editProfile.twitter,
        youtube: editProfile.youtube,
        instagram: editProfile.instagram,
        portfolio: editProfile.portfolio,
        location_city: editProfile.location_city,
        location_zip: editProfile.location_zip,
        location_state: editProfile.location_state,
        location_state: editProfile.location_state,
        about_me: editProfile.about_me,
        industry_id: industry
      }
    })
    history.push('/user');
  }
  // the rest of the functions handle the changes to the reducer editProfileReducer
    // that we use to store the information being sent to the database
  const handlePhoto = (e) => {
    dispatch({
      type: 'SET_PHOTO',
      payload: e.target.value
    })
  }
  const handleEmail = (e) => {
    dispatch({
      type: 'SET_EMAIL',
      payload: e.target.value
    })
  }
  const handleFirstName = (e) => {
    dispatch({
      type: 'SET_FIRST_NAME',
      payload: e.target.value
    })
  }
  const handleLastName = (e) => {
    dispatch({
      type: 'SET_LAST_NAME',
      payload: e.target.value
    })
  }
  const handleLocationCity = (e) => {
    dispatch({
      type: 'SET_LOCATION_CITY',
      payload: e.target.value
    })
  }
  const handleLocationState = (e) => {
    dispatch({
      type: 'SET_LOCATION_STATE',
      payload: e.target.value
    })
  }
  const handleLocationZip = (e) => {
    dispatch({
      type: 'SET_LOCATION_ZIP',
      payload: e.target.value
    })
  }
  const handleIndustry = (e) => {
    setIndustry(e.target.value);
    dispatch({
      type: 'SET_INDUSTRY',
      payload: e.target.value
    })
  }
  const handleLinkedin = (e) => {
    dispatch({
      type: 'SET_LINKEDIN',
      payload: e.target.value
    })
  }
  const handleFacebook = (e) => {
    dispatch({
      type: 'SET_FACEBOOK',
      payload: e.target.value
    })
  }
  const handleTwitter = (e) => {
    dispatch({
      type: 'SET_TWITTER',
      payload: e.target.value
    })
  }
  const handleYouTube = (e) => {
    dispatch({
      type: 'SET_YOUTUBE',
      payload: e.target.value
    })
  }
  const handleInstagram = (e) => {
    dispatch({
      type: 'SET_INSTAGRAM',
      payload: e.target.value
    })
  }
  const handlePortfolio = (e) => {
    dispatch({
      type: 'SET_PORTFOLIO',
      payload: e.target.value
    })
  }
  const handleAboutMe = (e) => {
    dispatch({
      type: 'SET_ABOUT_ME',
      payload: e.target.value
    })
  }

  return (
    <Grid container maxHeight="88%" sx={{ padding: '15px 0px' }}>

      {/* Row 1 */}
      <Grid item xs={3} />

      <Grid item xs={6} mt="10px" align="center" sx={{ paddingBottom: '10px' }}>
        <ListItemAvatar>
          <Avatar
            sx={{ width: 175, height: 175 }}
            src={editProfile.photo} />
        </ListItemAvatar>
      </Grid>

      <Grid item xs={3} />
      {/*  */}

      {/* Row 2 */}
      <Grid item xs={.5} />

      <Grid item xs={3} mt="20px">
        <TextField
          label="First Name"
          placeholder="First Name"
          value={editProfile.first_name || ''}
          onChange={handleFirstName}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Grid>

      <Grid item xs={.5} />

      <Grid item xs={4} mt="20px">
        <TextField
          label="Last Name"
          placeholder="Last Name"
          value={editProfile.last_name || ''}
          onChange={handleLastName}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Grid>
      <Grid item xs={.5} />
      <Grid item xs={3} mt="10px" sx={{ padding: '15px 0px' }}>
        <Button
          variant="contained"
          onClick={handleUpdateSubmit}
          sx={{
            color: 'white'
          }}
        >
          Update
        </Button>
      </Grid>
      <Grid item xs={.5} />

      {/* Row 3 */}
      <Grid item xs={.5} />
      <Grid item xs={4} mt="20px" size="small">
        <TextField
          select
          fullWidth
          label="Industry"
          placeholder="Industry"
          value={industry}
          onChange={handleIndustry}
          sx={{
            backgroundColor: 'white'
          }}
        >
          {industries.map((indus) => {
            return <MenuItem
              key={indus.id}
              value={indus.id}
            >
              {indus.industry_name}
            </MenuItem>
          })}
        </TextField>

      </Grid>

      <Grid item xs={.5} />

      <Grid item xs={6.5} mt="20px" size="small">
        <TextField
          fullWidth
          label="Email"
          placeholder="Email"
          value={editProfile.email || ''}
          onChange={handleEmail}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Grid>
      <Grid item xs={.5} />

      {/* Row 4 */}
      <Grid item xs={.5} />

      <Grid item xs={4.5} mt="20px" size="small">
        <TextField
          label="City"
          placeholder="City"
          value={editProfile.location_city || ''}
          onChange={handleLocationCity}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Grid>

      <Grid item xs={.5} />

      <Grid item xs={3} mt="20px">
        <TextField
          label="State"
          placeholder="State"
          value={editProfile.location_state || ''}
          onChange={handleLocationState}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Grid>

      <Grid item xs={.5} />
      <Grid item xs={2.5} mt="20px" size="small">
        <TextField
          py="5px"
          label="Zip"
          placeholder="Zip"
          value={editProfile.location_zip || ''}
          onChange={handleLocationZip}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Grid>

      <Grid item xs={.5} />
      {/*  */}

      {/* Row 5 */}
      <Grid item xs={.5} mt="20px" size="small" />

      <Grid item xs={5.25} mt="20px" size="small">
        <TextField
          label="Portfolio"
          placeholder="Portfolio"
          value={editProfile.portfolio || ''}
          onChange={handlePortfolio}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Grid>

      <Grid item xs={.5} mt="20px" size="small" />

      <Grid item xs={5.25} mt="20px" size="small">
        <TextField
          label="LinkedIn"
          placeholder="Linkedin"
          value={editProfile.linkedin || ''}
          onChange={handleLinkedin}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Grid>

      <Grid item xs={.5} mt="20px" size="small" />
      {/*  */}

      {/* Row 6 */}
      <Grid item xs={.5} mt="20px" size="small" />

      <Grid item xs={5.25} mt="20px" size="small">
        <TextField
          label="Twitter"
          placeholder="Twitter"
          value={editProfile.twitter || ''}
          onChange={handleTwitter}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Grid>

      <Grid item xs={.5} mt="20px" size="small" />

      <Grid item xs={5.25} mt="20px" size="small">
        <TextField
          label="YouTube"
          placeholder="YouTube"
          value={editProfile.youtube || ''}
          onChange={handleYouTube}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Grid>

      <Grid item xs={.5} mt="20px" size="small" />
      {/*  */}

      {/* Row 7 */}
      <Grid item xs={.5} mt="20px" size="small" />

      <Grid item xs={5.25} mt="20px" size="small">
        <TextField
          label="Facebook"
          placeholder="Facebook"
          value={editProfile.facebook || ''}
          onChange={handleFacebook}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Grid>

      <Grid item xs={.5} mt="20px" size="small" />

      <Grid item xs={5.25} mt="20px" size="small">
        <TextField
          label="Instagram"
          placeholder="Instagram"
          value={editProfile.instagram || ''}
          onChange={handleInstagram}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Grid>

      <Grid item xs={.5} mt="20px" size="small" />
      {/*  */}

      {/* Row 7 */}
      <Grid item xs={.5} mt="20px" size="small" />

      <Grid item xs={11} mt="20px" size="small">
        <TextField
          fullWidth
          multiline
          label="About Me"
          value={editProfile.about_me || ''}
          placeholder="About me"
          onChange={handleAboutMe}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Grid>

      <Grid item xs={.5} mt="20px" size="small" />
      {/*  */}

      {/* Row 8 */}
      <Grid item xs={.5} mt="20px" size="small" sx={{ marginLeft: '0px'}} />
      <Grid item xs={7} mt="20px" size="small">
        <TextField
          label="img url"
          placeholder="Photo-url"
          value={editProfile.photo || ''}
          onChange={handlePhoto}
          sx={{
            backgroundColor: 'white',
            width: '100%'
          }}
        />
      </Grid>
      <Grid item xs={.5} mt="20px" size="small" />
      <Grid item xs={3} sx={{ padding: '25px 10px' }}>
        <Button
          variant="contained"
          onClick={() => history.push("/user")}
          sx={{
            color: 'white'
          }}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditUserProfile;