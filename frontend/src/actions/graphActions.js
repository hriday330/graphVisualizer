import constants from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const setGraphs = (graphs) => (
  {
    type: constants.SET_GRAPHS,
    payload: graphs,
  }
);
