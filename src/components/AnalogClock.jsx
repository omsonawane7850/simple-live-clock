import { useEffect, useState } from "react";

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDegree = seconds * 6;
  const minuteDegree = minutes * 6 + seconds * 0.1;
  const hourDegree = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="analog-clock">
      <div className="number number-12">12</div>
      <div className="number number-3">3</div>
      <div className="number number-6">6</div>
      <div className="number number-9">9</div>

      <div
        className="hand hour-hand"
        style={{ transform: `rotate(${hourDegree}deg)` }}
      />

      <div
        className="hand minute-hand"
        style={{ transform: `rotate(${minuteDegree}deg)` }}
      />

      <div
        className="hand second-hand"
        style={{ transform: `rotate(${secondDegree}deg)` }}
      />

      <div className="clock-center" />
    </div>
  );
};

export default AnalogClock;
