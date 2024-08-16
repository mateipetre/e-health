import { FETCH_PERMISSIONS_SUCCESS, FETCH_PERMISSIONS_FAIL } from './userActions';

// Initial state
const initialState = {
  permissions: [],
  error: null,
};

// Reducer function
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PERMISSIONS_SUCCESS:
      return {
        ...state,
        permissions: action.payload,
      };
    case FETCH_PERMISSIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;