import { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const startTimeRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;

      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
    startTimeRef.current = 0;
  };

  const handleLap = () => {
    if (!isRunning) return;

    setLaps((prevLaps) => [
      {
        id: Date.now(),
        time: elapsedTime,
      },
      ...prevLaps,
    ]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}.${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <section className="stopwatch">
      {" "}
      <h2 className="heading">Stopwatch</h2>
      <div
        className="display"
        role="timer"
        aria-label={`Elapsed time ${formatTime(elapsedTime)}`}
      >
        {formatTime(elapsedTime)}
      </div>
      <div className="controls">
        {!isRunning ? (
          <button type="button" className="startButton" onClick={handleStart}>
            {elapsedTime > 0 ? "Resume" : "Start"}
          </button>
        ) : (
          <button type="button" className="pauseButton" onClick={handlePause}>
            Pause
          </button>
        )}

        <button
          type="button"
          className="lapButton"
          onClick={handleLap}
          disabled={!isRunning}
        >
          Lap
        </button>

        <button type="button" className="resetButton" onClick={handleReset}>
          Reset
        </button>
      </div>
      {laps.length > 0 && (
        <div className="lapSection">
          <h3 className="lapHeading">Lap Times</h3>

          <ul className="lapList">
            {laps.map((lap, index) => (
              <li key={lap.id} className="lapItem">
                <span>Lap {laps.length - index}</span>
                <strong>{formatTime(lap.time)}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Stopwatch;
