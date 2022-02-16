import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import UserDetail from '../UserDetail/UserDetail';

function UserPage() {
  const userProfile = useSelector((store) => store.userProfileReducer);
  const dispatch = useDispatch();


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
