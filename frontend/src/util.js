export const getRandomInt = (min, max) => {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil)) + minCeil;
};

// delay in ms
// eslint-disable-next-line no-promise-executor-return
export const sleep = (delay = 500) => new Promise((resolve) => setTimeout(resolve, delay));
