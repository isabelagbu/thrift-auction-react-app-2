// src/components/CountdownTimer.js
import React, { useState, useEffect } from 'react';
 
const CountdownTimer = ({ auctionEnd }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(auctionEnd));
 
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft(getTimeLeft(auctionEnd));
    }, 1000);
 
    return () => clearInterval(timerInterval);
  }, [auctionEnd]);
 
  function getTimeLeft(endDate) {
    const now = new Date();
    const timeDifference = new Date(endDate) - now;
 
    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
 
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
 
    return { days, hours, minutes, seconds };
  }
 
  return (
    <div className="timer-box">
      <div className="timer">
        <div className="timer-item">
          <span className="timer-value">{timeLeft.days}</span>
          <span className="timer-label">Days</span>
        </div>
        <div className="timer-item">
          <span className="timer-value">{timeLeft.hours}</span>
          <span className="timer-label">Hours</span>
        </div>
        <div className="timer-item">
          <span className="timer-value">{timeLeft.minutes}</span>
          <span className="timer-label">Minutes</span>
        </div>
        <div className="timer-item">
          <span className="timer-value">{timeLeft.seconds}</span>
          <span className="timer-label">Seconds</span>
        </div>
      </div>
    </div>
  );
};
 
export default CountdownTimer;