import React from 'react'

const GlobalContext = React.createContext({signUp: {}}); // Create a context object

export {
  GlobalContext // Export it so it can be used by other Components
};