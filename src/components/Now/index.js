import React, { useState, useEffect } from 'react';
import * as moment from 'moment';

export default function Now() {
  const [now, setNow] = useState(moment());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(moment());
    }, 500);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <span>{now.format(`A hh:mm:ss`)}</span>
  )
}
