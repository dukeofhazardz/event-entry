import React, { useState } from 'react';
import { EventForm } from './EventForm';

export const Event = () => {
  const [ formTarget, setFormTarget ] = useState({type: "insert"});

  const handleFormClose = () => {
    // Closes the form by setting formTarget to null
    setFormTarget(null);
  };

  const renderEventForm = () => {
    // Renders form if formTarget is not null
    return formTarget ? (
      <EventForm
        type={formTarget.type}
        onClose={handleFormClose} // The function to close the form
      />
    ) : null;
  };

  return (
  <div className='event'>
    {renderEventForm()}
  </div>
  )
};
