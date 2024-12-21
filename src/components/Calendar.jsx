import React, { useState } from "react";
import dayjs from "dayjs";
import "./Calendar.css";
import NextIcon from "../assets/next.svg";
import PrevIcon from "../assets/prev.svg";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [startWeekOnMonday, setStartWeekOnMonday] = useState(false);

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");

  const startOfGrid = startOfMonth
    .startOf("week")
    .add(startWeekOnMonday ? 1 : 0, "day");
  const endOfGrid = endOfMonth
    .endOf("week")
    .add(startWeekOnMonday ? 1 : 0, "day");

  const days = [];
  let current = startOfGrid.clone();

  while (current.isBefore(endOfGrid, "day")) {
    days.push(current);
    current = current.add(1, "day");
  }

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const toggleStartWeek = () => {
    setStartWeekOnMonday(!startWeekOnMonday);
  };

  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <div className="calendar-navigation">
          <button onClick={handlePreviousMonth} className="nav-btn">
            <img src={PrevIcon} alt="" />
          </button>
          <button onClick={handleNextMonth} className="nav-btn">
            <img src={NextIcon} alt="" />
          </button>

          <h2 className="current-month">{currentDate.format("MMMM YYYY")}</h2>
        </div>
        <button onClick={toggleStartWeek} className="toggle-week-button">
          <span className="full-text">
            Toggle Week Start ({startWeekOnMonday ? "Monday" : "Sunday"})
          </span>
          <span className="short-text">{startWeekOnMonday ? "M" : "S"}</span>
        </button>
      </header>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
          .slice(startWeekOnMonday ? 1 : 0)
          .concat(startWeekOnMonday ? ["Sun"] : [])
          .map((day) => (
            <div key={day} className="weekday-header">
              {day}
            </div>
          ))}

        {days.map((day) => {
          const isCurrentMonth = day.month() === currentDate.month();
          const isToday = day.isSame(dayjs(), "day");

          return (
            <div
              key={day.format("YYYY-MM-DD")}
              className={`day-tile ${isCurrentMonth ? "" : "greyed-out"} ${
                isToday ? "today" : ""
              }`}
              title={day.format("MMMM D, YYYY")}
            >
              {day.date()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
