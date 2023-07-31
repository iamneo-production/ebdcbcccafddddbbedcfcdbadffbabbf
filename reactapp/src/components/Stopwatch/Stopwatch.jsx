import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resumeTimer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    clearInterval(intervalRef.current);
  };

  const renderButton = () => {
    if (isRunning) {
      return (
        <>
          <button data-testid="pause" id="pause" onClick={pauseTimer}>
            Pause
          </button>
          <button data-testid="reset" id="reset" onClick={resetTimer}>
            Reset
          </button>
        </>
      );
    } else if (time > 0) {
      return (
        <>
          <button data-testid="resume" id="resume" onClick={resumeTimer}>
            Resume
          </button>
          <button data-testid="reset" id="reset" onClick={resetTimer}>
            Reset
          </button>
        </>
      );
    } else {
      return (
        <button data-testid="start" id="start" onClick={startTimer}>
          Start
        </button>
      );
    }
  };

  return (
    <div>
      <p data-testid="time" id="time">
        {formatTime(time)}
      </p>
      {renderButton()}
    </div>
  );
};

Stopwatch.propTypes = {
  formatTime: PropTypes.func,
};

Stopwatch.defaultProps = {
  formatTime: (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}.${String(milliseconds).padStart(2, '0')}`;
  },
};

export default Stopwatch;
