import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { string } from 'prop-types';

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
  }

  const handleIndustryChange = (event) =>  {
    let filteredSearch = searchProfilesReducer.filter(industry => industry.industry_id == event.target.value);
    for (let i = 0; i < filteredSearch.length; i++) {
      let index = searchProfilesReducer.indexOf(filteredSearch[i]);
      searchProfilesReducer.splice(index, 1);
      searchProfilesReducer.unshift(filteredSearch[i]);
    }
    console.log(searchProfilesReducer);
    return searchProfilesReducer;
  }




  return (
    <div>
      <input onChange={(event) => handleQueryChange(event)}></input>
      <select onChange={(event) => handleIndustryChange(event)}>
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