const meetingsDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_MEETING_DETAIL':
        console.log('$$$$ in EditMeetingDetails reducer', action.payload);
        
  
        return {

          meetup_location: action.payload.meetup_location,
          date: action.payload.date,
          summary: action.payload.summary  
         
        }
        
      case 'SAVE_MEETING_DETAILS':
        return action.payload
      case 'SET_MEETINGUP_LOCATION':
        return {...state, meetup_location: action.payload}
      case 'SET_DATE':
        return { ...state, date: action.payload }
      case 'SET_SUMMARY':
        return { ...state, summary: action.payload }
      default:
        return state;
    }
  }
  
  export default meetingsDetailsReducer;