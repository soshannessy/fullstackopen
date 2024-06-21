import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef(({ children, buttonLabelOpen, buttonLabelClose }, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }));

  return (
    <div>
      {!visible && (
        <button onClick={toggleVisibility}>{buttonLabelOpen}</button>
      )}
      {visible && (
        <div>
          {children}
          <button onClick={toggleVisibility}>{buttonLabelClose}</button>
        </div>
      )}
    </div>
  );
});

export default Togglable;
