const notes = (state = {}, action) => {
  if (action.type === 'SET_NOTES') {
      return {
      notes: action.payload,
      }
  } else if (action.type === 'EDIT_NOTES') {
      return { ...state, notes: action.payload }
  } else if (action.type === 'CLEAR_EDIT_NOTES') {
      return {};
  }
  return state;
};

export default notes;