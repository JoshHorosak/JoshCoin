import React from 'react';

const Time = ({ motokoTime }) => {
  // Create a new Date object based on the Motoko time in milliseconds
  const jsDate = new Date(Number(motokoTime) / 1000000);

  // Format the date and time
  const formattedDateTime = jsDate.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  console.log(formattedDateTime);

  return (
    <h6 style={{margin:"5px"}}> {formattedDateTime}</h6>
  );

};

export default Time;