import { useEffect, useRef, useState } from "react";

const AlarmClock = () => {
const [alarmTime, setAlarmTime] = useState("");
const [alarms, setAlarms] = useState([]);
const [activeAlarm, setActiveAlarm] = useState(null);
const [isRinging, setIsRinging] = useState(false);

const audioRef = useRef(null);
const triggeredAlarmsRef = useRef(new Set());

useEffect(() => {
const checkAlarms = () => {
const now = new Date();
const currentTime = `${String(now.getHours()).padStart(
        2,
        "0"
      )}:${String(now.getMinutes()).padStart(2, "0")}`;


  setAlarms((prevAlarms) => {
    let updatedAlarms = prevAlarms;
    let alarmToTrigger = null;

    prevAlarms.forEach((alarm) => {
      if (
        alarm.enabled &&
        alarm.time === currentTime &&
        !triggeredAlarmsRef.current.has(alarm.id)
      ) {
        triggeredAlarmsRef.current.add(alarm.id);
        alarmToTrigger = alarm;
      }
    });

    if (alarmToTrigger) {
      setActiveAlarm(alarmToTrigger);
      setIsRinging(true);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
        });
      }

      updatedAlarms = prevAlarms.map((alarm) =>
        alarm.id === alarmToTrigger.id
          ? { ...alarm, enabled: false }
          : alarm
      );
    }

    return updatedAlarms;
  });
};

checkAlarms();

const intervalId = setInterval(checkAlarms, 1000);

return () => {
  clearInterval(intervalId);
};


}, []);

const handleAddAlarm = (event) => {
event.preventDefault();

if (!alarmTime) return;

const newAlarm = {
  id: `${Date.now()}-${Math.random()}`,
  time: alarmTime,
  enabled: true,
};

setAlarms((prevAlarms) =>
  [...prevAlarms, newAlarm].sort((a, b) =>
    a.time.localeCompare(b.time)
  )
);

setAlarmTime("");

};

const handleDeleteAlarm = (id) => {
setAlarms((prevAlarms) =>
prevAlarms.filter((alarm) => alarm.id !== id)
);

triggeredAlarmsRef.current.delete(id);

if (activeAlarm?.id === id) {
  handleDismissAlarm();
}

};

const handleToggleAlarm = (id) => {
setAlarms((prevAlarms) =>
prevAlarms.map((alarm) =>
alarm.id === id
? { ...alarm, enabled: !alarm.enabled }
: alarm
)
);

triggeredAlarmsRef.current.delete(id);

};

const handleDismissAlarm = () => {
setIsRinging(false);
setActiveAlarm(null);

if (audioRef.current) {
  audioRef.current.pause();
  audioRef.current.currentTime = 0;
}

};

return ( <section className="alarm-clock"> <h2 className="alarm-heading">Alarm Clock</h2>
  <form className="alarm-form" onSubmit={handleAddAlarm}>
    <label htmlFor="alarm-time">Set Alarm Time</label>

    <input
      id="alarm-time"
      type="time"
      value={alarmTime}
      onChange={(event) => setAlarmTime(event.target.value)}
      required
    />

    <button type="submit" className="add-alarm-button">
      Add Alarm
    </button>
  </form>

  {isRinging && activeAlarm && (
    <div className="alarm-ringing" role="alert">
      <p>Alarm is ringing! {activeAlarm.time}</p>

      <button
        type="button"
        className="dismiss-alarm-button"
        onClick={handleDismissAlarm}
      >
        Dismiss
      </button>
    </div>
  )}

  <div className="alarm-list-section">
    <h3 className="alarm-list-heading">Your Alarms</h3>

    {alarms.length === 0 ? (
      <p className="no-alarms">No alarms set.</p>
    ) : (
      <ul className="alarm-list">
        {alarms.map((alarm) => (
          <li key={alarm.id} className="alarm-item">
            <span className="alarm-time">{alarm.time}</span>

            <label className="alarm-toggle">
              <input
                type="checkbox"
                checked={alarm.enabled}
                onChange={() => handleToggleAlarm(alarm.id)}
              />
              <span>{alarm.enabled ? "Enabled" : "Disabled"}</span>
            </label>

            <button
              type="button"
              className="delete-alarm-button"
              onClick={() => handleDeleteAlarm(alarm.id)}
              aria-label={`Delete alarm at ${alarm.time}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>

  <audio
    ref={audioRef}
    loop
    preload="auto"
    src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
  />
</section>

);
};

export default AlarmClock;
