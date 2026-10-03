import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ClockHeading from "./components/ClockHeading";
import ClockSlogan from "./components/ClockSlogan";
import AnalogClock from "./components/AnalogClock";
import CurrentTime from "./components/CurrentTime";

function App() {
  return (
    <div className="clock-app">
      <div className="clock-card">
        <ClockHeading />
        <ClockSlogan />

        <AnalogClock />

        <CurrentTime />
      </div>
    </div>
  );
}

export default App;