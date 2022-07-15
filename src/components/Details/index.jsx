import React from "react";

const Details = ({ title, text, red }) => {
  return (
    <div className="container mt-3 no-pl">
      <div className="col">{title}</div>
      <div className="col">
        {red ? <b className="red">{text}</b> : <b>{text}</b>}
      </div>
    </div>
  );
};

export default Details;
