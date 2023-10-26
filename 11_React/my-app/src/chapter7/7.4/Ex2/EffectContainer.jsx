import React from 'react';
import { useState } from 'react';
import EventSummary from './EventSummary';

function EffectContainer(props) {
  const [isvisible, setIsvisible] = useState(true);
  return (
    <>
      <button onClick={() => setIsvisible(false)}>사라져</button>
      <button onClick={() => setIsvisible(true)}>나타나</button>
      {isvisible && <EventSummary />}
    </>
  );
}

export default EffectContainer;