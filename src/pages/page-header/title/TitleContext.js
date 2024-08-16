import React, { createContext, useContext, useState } from 'react';

const TitleStateContext = createContext(undefined);
const TitleDispatchContext = createContext(undefined);

/**
 * Provides title state and dispatch to its children.
 * @param {object} props - The properties for the provider.
 * @param {React.ReactNode} props.children - The children components.
 * @returns {JSX.Element} The TitleProvider component.
 */
function TitleProvider({ children }) {
  const [title, setTitle] = useState('');
  
  return (
    <TitleStateContext.Provider value={{ title }}>
      <TitleDispatchContext.Provider value={setTitle}>
        {children}
      </TitleDispatchContext.Provider>
    </TitleStateContext.Provider>
  );
}

/**
 * Custom hook to use the title state.
 * @returns {object} The title state context.
 * @throws Will throw an error if used outside of a TitleProvider.
 */
function useTitle() {
  const context = useContext(TitleStateContext);
  if (context === undefined) {
    throw new Error('useTitle must be used within a TitleProvider');
  }
  return context;
}

/**
 * Custom hook to update the title.
 * @returns {function} The setTitle function.
 * @throws Will throw an error if used outside of a TitleProvider.
 */
function useUpdateTitle() {
  const context = useContext(TitleDispatchContext);
  if (context === undefined) {
    throw new Error('useUpdateTitle must be used within a TitleProvider');
  }
  return context;
}

export { TitleProvider, useTitle, useUpdateTitle };