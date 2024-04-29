import constants from '../constants';

const UserReducer = (state, action) => {
  switch (action.type) {
    case constants.SET_USER_ID:
      return { ...state, id: action.payload };
    case constants.SET_GRAPHS:
      return { ...state, graphs: action.payload };
    case constants.LOGOUT:
      return { ...state, graphs: [], id: null };
    default:
      return state;
  }
};

export default UserReducer;
