import React from 'react';
import { useButtons } from './ButtonBarProvider';

/**
 * Component to render a toolbar with buttons.
 * @returns {JSX.Element|null} The ButtonToolBar component or null if no buttons.
 */
const ButtonToolBar = () => {
  const buttons = useButtons();

  if (buttons.length === 0) {
    return null;
  }

  return <div className="button-toolbar">{buttons.map((button, index) => (
    <React.Fragment key={index}>{button}</React.Fragment>
  ))}</div>;
};

export default ButtonToolBar;