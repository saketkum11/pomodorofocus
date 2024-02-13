import React, { use, useEffect, useState } from "react";
const Timer = () => {
  const [time, setTime] = useState(60 * 25);
  const [isActive, setIsActive] = useState(false);
  const [isCompleteTask, setIsComplete] = useState(false);
  useEffect(() => {
    if (isActive && time > 0) {
      const timerCount = setInterval(() => {
        setTime((time): any => time - 1);
      }, 1000);
      return () => clearInterval(timerCount);
    }
  }, [time, isActive]);

  return { time, setTime, isActive, setIsActive };
};
export default Timer;
