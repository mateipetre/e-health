import axios from 'axios';

// Action creator for fetching user permissions
export const fetchUserPermissions = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8080/api/permissions');
    dispatch({
      type: 'FETCH_PERMISSIONS_SUCCESS',
      payload: response.data.permissions,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_PERMISSIONS_FAIL',
      payload: error.message,
    });
  }
};
