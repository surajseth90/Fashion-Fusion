import React, { useState } from "react";
import "./style.scss";

const CustomCalendar = (props) => {
  const { hideMonthYear } = props;
  // Initial state with the current date
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState();

  // Function to move to the previous week
  const moveToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  // Function to move to the next week
  const moveToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  // Function to get the days of the current week
  const getDaysInWeek = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  };

  // Function to get the day name (Monday, Tuesday, etc.)
  const getDayName = (date) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[date.getDay()];
  };

  return (
    <div className="calender-days-container">
      <p className={`font-bold font-14 mb-3 ${hideMonthYear ? "d-none " : ""}`}>
        {currentDate.toLocaleDateString("default", {
          month: "short",
          year: "numeric",
        })}
      </p>
      <div className="d-flex">
        <ul className="d-flex flex-wrap">
          <li>
            <button className="next-prev-btn" onClick={moveToPreviousWeek}>
              &lt;
            </button>
          </li>
          {getDaysInWeek().map((day, key) => (
            <li
              key={day.toISOString()}
              className={`date-li ${
                day.toDateString() === selectedDay ? "date-li-selected" : ""
              }`}
            >
              <button
                className={`d-flex justify-content-center align-items-center flex-column w-100 h-100`}
                onClick={(e) => {
                  setSelectedDay(day.toDateString());
                }}
              >
                <p className="font-bold font-11">
                  {getDayName(day).slice(0, 3).toUpperCase()}
                </p>
                <p className="font-12 text-grey">
                  {day.getDate()}{" "}
                  {day.toLocaleDateString("default", { month: "short" })}
                </p>
                <p></p>
              </button>
            </li>
          ))}
          <li>
            <button className="next-prev-btn" onClick={moveToNextWeek}>
              &gt;
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomCalendar;
