import React from 'react';

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const { message, type } = notification;

  return (
    <div className={type === 'success' ? 'success' : 'error'}>
      {message}
    </div>
  );
};

export default Notification;