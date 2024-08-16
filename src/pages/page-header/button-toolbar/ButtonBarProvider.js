import React, { useState, createContext, useContext } from 'react';

const ButtonBarStateContext = createContext([]);
const ButtonBarUpdateContext = createContext(() => {
  // empty initial state
});

/**
 * Provides button bar state and update functions to its children.
 * @param {object} props - The properties for the provider.
 * @param {React.ReactNode} props.children - The children components.
 * @returns {JSX.Element} The ButtonBarProvider component.
 */
function ButtonBarProvider({ children }) {
  const [state, setState] = useState([]);
  
  return (
    <ButtonBarStateContext.Provider value={state}>
      <ButtonBarUpdateContext.Provider value={setState}>
        {children}
      </ButtonBarUpdateContext.Provider>
    </ButtonBarStateContext.Provider>
  );
}

/**
 * Custom hook to use the button bar state.
 * @returns {React.ReactNode[]} The button bar state context.
 * @throws Will throw an error if used outside of a ButtonBarProvider.
 */
function useButtons() {
  const context = useContext(ButtonBarStateContext);
  if (context === undefined) {
    throw new Error('useButtons must be used within a Button Bar Context');
  }
  return context;
}

/**
 * Custom hook to update the button bar.
 * @returns {function} The setState function.
 * @throws Will throw an error if used outside of a ButtonBarProvider.
 */
function useButtonToolbarSetter() {
  const context = useContext(ButtonBarUpdateContext);
  if (context === undefined) {
    throw new Error('useButtonToolbarSetter must be used within a Button Bar Context');
  }
  return context;
}

export { ButtonBarProvider, useButtons, useButtonToolbarSetter };