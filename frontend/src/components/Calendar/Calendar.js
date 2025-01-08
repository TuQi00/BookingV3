import React, { useState, useEffect } from "react";
import "../../styles/Calendar.css";

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const today = new Date();

  useEffect(() => {
    const days = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysArray = Array.from({ length: 42 }, (_, i) => {
      if (i < firstDay || i >= days + firstDay) return null;
      return i - firstDay + 1;
    });
    setDaysInMonth(daysArray);
  }, [currentMonth, currentYear]);

  const isSelected = (day) => {
    if (!selectedDate) return false;
    const selected = new Date(selectedDate);
    return (
      day === selected.getDate() &&
      currentMonth === selected.getMonth() &&
      currentYear === selected.getFullYear()
    );
  };

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isPastDate = (day) => {
    if (!day) return true; // Không hiển thị các ngày rỗng
    const thisDate = new Date(currentYear, currentMonth, day);
    return thisDate < today.setHours(0, 0, 0, 0);
  };

  const handleDayClick = (day) => {
    if (!day || isPastDate(day)) return;
    setSelectedDate(new Date(currentYear, currentMonth, day).toISOString());
  };

  const handleMonthChange = (increment) => {
    let newMonth = currentMonth + increment;
    if (newMonth < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else if (newMonth > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(-1)} className="btn-prev">
          &#8249;
        </button>
        <select
          value={currentMonth}
          onChange={(e) => setCurrentMonth(Number(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>
        <select
          value={currentYear}
          onChange={(e) => setCurrentYear(Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => {
            const year = today.getFullYear() + i;
            return (
              <option key={i} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <button onClick={() => handleMonthChange(1)} className="btn-next">
          &#8250;
        </button>
      </div>
      <div className="calendar-grid">
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`calendar-cell ${
              day
                ? isPastDate(day)
                  ? "disabled"
                  : isSelected(day)
                  ? "selected"
                  : isToday(day)
                  ? "today"
                  : "available"
                : "hidden"
            }`}
            onClick={() => handleDayClick(day)}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
