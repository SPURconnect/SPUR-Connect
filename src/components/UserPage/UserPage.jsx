import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import UserDetail from '../UserDetail/UserDetail';

function UserPage() {
  // hooks being used
  const dispatch = useDispatch();
  // reducers being used
  const userProfile = useSelector((store) => store.userProfileReducer);

  // fetches the user profile and maps through the details for displaying
    // logoutButton is imported here
  useEffect(() => {
    dispatch({
      type: 'SAGA_FETCH_USER_PROFILES'
    })
  }, [])

  return (
    <div className="container">
      <div
        style={{ position: 'absolute', top: 15, right: 15}}
      >
        <LogOutButton
          className="btn"
        />
      </div>
      {userProfile.map((profile) => {
        return <UserDetail key={profile.id} profile={profile} />
      })}

    </div>
  );
}

export default UserPage;
