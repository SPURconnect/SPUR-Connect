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
  const industriesReducer = useSelector(store => store.industriesReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_INDUSTRIES' })
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
  }
}


  return (
    <div>
      <input onChange={(event) => handleQueryChange(event)}></input>
      <select>
        <option>Filter By Industry</option>
        {industriesReducer.map((industry) =>  {
            return  (
              <option key={industry.id} value={industry.id}>{industry.industry_name}</option>
            )
        })}
      </select>
        
      {searchProfilesReducer.map((item, index) =>    
                    <p key={index}>{item.first_name}</p>
                )}
    </div>
  );
}

export default SearchProfiles;