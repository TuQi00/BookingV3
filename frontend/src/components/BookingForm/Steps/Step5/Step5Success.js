import React from "react";

const Step5Success = ({ resetForm }) => {
  return (
    <div>
      <h2>Booking Successful!</h2>
      <button onClick={resetForm}>Start Over</button>
    </div>
  );
};

export default Step5Success;
