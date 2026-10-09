import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ClockHeading from "./components/ClockHeading";
import ClockSlogan from "./components/ClockSlogan";
import AnalogClock from "./components/AnalogClock";
import CurrentTime from "./components/CurrentTime";
import Mode from "./components/Mode";
import Stopwatch from "./components/Stopwatch";

function App() {
  return (
    <div className="clock-app">
      <div className="clock-card">
        <Mode />

        <ClockHeading />
        <ClockSlogan />

        <AnalogClock />

        <CurrentTime />
        <Stopwatch />
      </div>
    </div>
  );
}

export default App;
