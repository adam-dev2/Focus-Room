import React, { useState, useEffect, useRef } from "react";

const PomodoroTimer = () => {
  const WORK_TIME = 25 * 60; // 25 minutes
  const BREAK_TIME = 5 * 60; // 5 minutes

  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);

  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setIsWorkSession((prevSession) => !prevSession);
            return isWorkSession ? BREAK_TIME : WORK_TIME;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, isWorkSession]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(isWorkSession ? WORK_TIME : BREAK_TIME);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg border-2 border-gray-300 w-80">
      <h1 className="text-2xl font-bold mb-4">
        {isWorkSession ? "Timer" : "Break Time"}
      </h1>
      <div className="text-5xl font-mono mb-6">{formatTime(timeLeft)}</div>
      <div className="flex gap-4">
        <button
          onClick={handleStartPause}
          className="px-4 py-2 rounded-lg bg-gray-500 text-white font-semibold hover:bg-gray-600 transition cursor-pointer"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-lg bg-gray-300 font-semibold hover:bg-gray-400 transition cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
