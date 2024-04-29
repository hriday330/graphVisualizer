// eslint-disable-next-line no-unused-vars
import constants from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const setUserId = (userId) => ({
  type: constants.SET_USER_ID,
  payload: userId,
});

export const logoutAction = () => ({
  type: constants.LOGOUT,
});
