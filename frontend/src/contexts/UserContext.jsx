import React, { createContext, useContext, useReducer } from 'react';
import UserReducer from '../reducers/userReducer';

const UserContext = createContext();
const UserDispatchContext = createContext();

// eslint-disable-next-line react/prop-types
function UserProvider({ children }) {
  const initialState = {
    id: null,
    graphs: [],
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      'useUser must be used within a UserProvider',
    );
  }
  return context;
};

const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useUserDispatch must be used within a UserDispatchProvider',
    );
  }
  return context;
};

export { UserProvider, useUser, useUserDispatch };
