import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimeTableGenerator = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeTable, setTimeTable] = useState([]);

  // Generate timetable
  const generateTimeTable = () => {
    if (startDate > endDate) {
      alert("Start date cannot be after End date!");
      return;
    }

    let currentDate = new Date(startDate);
    let generatedTable = [];

    while (currentDate <= endDate) {
      generatedTable.push({
        date: currentDate.toDateString(),
        task: "Scheduled Task", // You can customize this
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setTimeTable(generatedTable);
  };

  return (
    <div className="flex flex-col items-center bg-green-200 min-h-screen p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Time Table Generator</h2>

        {/* Date Pickers */}
        <div className="mb-4">
          <label className="block text-gray-700">Select Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Select End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={generateTimeTable}
          className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
        >
          Auto Generate (All Time Tables)
        </button>
      </div>

      {/* Time Table Display */}
      {timeTable.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
          <h3 className="text-lg font-bold">Generated Time Table</h3>
          <ul className="mt-2">
            {timeTable.map((entry, index) => (
              <li key={index} className="border-b p-2">
                📅 {entry.date} - {entry.task}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TimeTableGenerator;
