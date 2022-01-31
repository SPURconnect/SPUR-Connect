const editProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EDIT_PROFILE':

      return {
        email: action.payload.email,
        photo: action.payload.photo,
        facebook: action.payload.facebook,
        linkedin: action.payload.linkedin,
        twitter: action.payload.twitter,
        youtube: action.payload.youtube,
        portfolio: action.payload.portfolio,
        location_city: action.payload.location_city,
        location_zip: action.payload.location_zip,
        location_state: action.payload.location_state,
        about_me: action.payload.about_me,
        industry: action.payload.industry_name
      }

    case 'SET_EMAIL':
      return{...state, email:action.payload}
    case 'SET_PHOTO':
      return { ...state, photo: action.payload }
    case 'SET_FIRST_NAME':
      return { ...state, first_name: action.payload }
    case 'SET_LAST_NAME':
      return { ...state, last_name: action.payload }
    case 'SET_FACEBOOK':
      return { ...state, facebook: action.payload }
    case 'SET_LINKEDIN':
      return { ...state, linkedin: action.payload }
    case 'SET_TWITTER':
      return { ...state, twitter: action.payload }
    case 'SET_YOUTUBE':
      return { ...state, youtube: action.payload }
    case 'SET_PORTFOLIO':
      return { ...state, portfolio: action.payload }
    case 'SET_LOCATION_CITY':
      return { ...state, location_city: action.payload }
    case 'SET_LOCATION_ZIP':
      return { ...state, location_zip: action.payload }
    case 'SET_LOCATION_STATE':
      return { ...state, location_state: action.payload }
    case 'SET_ABOUT_ME':
      return { ...state, about_me: action.payload }
    case 'SET_INDUSTRY':
      return { ...state, industry_name: action.payload }
    default:
      return state;
  }
}

export default editProfileReducer;