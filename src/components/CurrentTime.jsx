import React from "react";

const CurrentTime = () => {
  let time = new Date();
  return (
    <p className="lead">
      Date :{" "}
      <strong>
        {" "}
        {time.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </strong>{" "}
      - Current Time: <strong> {time.toLocaleTimeString()}</strong>
    </p>
  );
};

export default CurrentTime;
