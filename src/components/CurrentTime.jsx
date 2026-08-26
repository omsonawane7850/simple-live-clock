import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const CurrentTime = () => {
  let [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
