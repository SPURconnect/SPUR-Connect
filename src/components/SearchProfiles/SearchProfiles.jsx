import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function SearchProfiles(props) {
 
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');
  const dispatch = useDispatch();
  const searchProfilesReducer = useSelector(store => store.searchProfilesReducer);
  // const [search, setSearch] = useState('');

  // useEffect(() => {
  //   dispatch({
  //     type: 'FETCH_PROFILES'
  //   })
  // }, [])

  const handleQueryChange = (event) => {
    event.preventDefault();
    dispatch({
      type: 'FETCH_PROFILES',
      payload: event.target.value
    })
  }


  return (
    <div>
      <input onChange={(event) => handleQueryChange(event)}></input>
        
      {searchProfilesReducer.map((item, index) =>    
                    <p key={index}>{item.first_name}</p>
                )}
    </div>
  );
}

export default SearchProfiles;