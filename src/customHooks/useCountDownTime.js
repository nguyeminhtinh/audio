import { useEffect, useState } from 'react';
import moment from 'moment';

/**
 * how to using
 * @param {} time 
 * const [minutes, seconds, handleReset, handleStart] = useCountDownTime(
    parseInt(startTime, 10)
  )
  // useCallback to prevent infinity call in useEffect
  const handleStarCount = useCallback(handleStart, []);
  const handleSetImminent = useCallback(setImminent, []);
  const handleResetCount = useCallback(handleReset, []);
 */

const useCountDownTime = (time) => {
  const minuteVal = moment.duration(time).minutes();
  const secondVal = moment.duration(time).seconds();

  const [minutes, setMinutes] = useState(minuteVal);
  const [seconds, setSeconds] = useState(secondVal);
  const [isStartCountDown, setIsStartCountDown] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isStartCountDown) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
          return;
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            return;
          }
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds, isStartCountDown]);

  const handleReset = (countdownSeconds) => {
    if (countdownSeconds) {
      setMinutes(0);
      setSeconds(countdownSeconds);
      setIsStartCountDown(true);

      return;
    }

    setMinutes(0);
    setSeconds(0);
    setIsStartCountDown(false);
  };

  const handleStart = () => {
    setIsStartCountDown(true);
    const isStarInMinute = secondVal - 1 < 0;
    setSeconds(isStarInMinute ? 59 : secondVal);
    setMinutes(isStarInMinute ? minuteVal - 1 : minuteVal);
  };

  return [minutes, seconds, handleStart, handleReset];
};

export default useCountDownTime;
