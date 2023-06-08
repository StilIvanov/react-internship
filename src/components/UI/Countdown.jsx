import React from "react";
import { useState } from "react";

export default function Countdown({ expiryDate }) {
  let startTime = Date.now();
  let countdown = expiryDate;

  const [secondsText, setSecondsText] = useState(countdown);
  const [minutesText, setMinutesText] = useState(countdown);
  const [hoursText, setHoursText] = useState(countdown);

  const [visible, setVisible] = useState(true);

  function updateTime() {
    let startTime = Date.now();
    let countdown = expiryDate;
    let timeElapsed = countdown - startTime;

    if (countdown === null) {
      setVisible(false);
    }

    let secondsLeft = timeElapsed / 1000;
    let minutesLeft = secondsLeft / 60;
    let hoursLeft = minutesLeft / 24;

    let secondsText = Math.floor(secondsLeft) % 60;
    let minutesText = Math.floor(minutesLeft) % 60;
    let hoursText = Math.floor(hoursLeft);

    setSecondsText(secondsText);
    setMinutesText(minutesText);
    setHoursText(hoursText);
  }
  setInterval(() => {
    updateTime();
  }, 1000);

  return (
    <>
      {visible ? (
        <div className="de_countdown">
          {hoursText} h <span></span>
          {minutesText}m <span></span>
          {secondsText}s <span></span>
        </div>
      ) : null}
    </>
  );
}
