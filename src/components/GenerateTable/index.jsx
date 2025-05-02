// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const TimeTableGenerator = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [timeTable, setTimeTable] = useState([]);

//   // Generate timetable
//   const generateTimeTable = () => {
//     if (startDate > endDate) {
//       alert("Start date cannot be after End date!");
//       return;
//     }

//     let currentDate = new Date(startDate);
//     let generatedTable = [];

//     while (currentDate <= endDate) {
//       generatedTable.push({
//         date: currentDate.toDateString(),
//         task: "Scheduled Task", // You can customize this
//       });
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     setTimeTable(generatedTable);
//   };

//   return (
//     <div className="flex flex-col items-center bg-blue-50 min-h-screen p-6">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4 text-center">
//           Time Table Generator
//         </h2>

//         {/* Date Pickers */}
//         <div className="mb-4">
//           <label className="block text-gray-700">Select Start Date:</label>
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             className="border p-2 w-full rounded"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Select End Date:</label>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             className="border p-2 w-full rounded"
//           />
//         </div>

//         {/* Generate Button */}
//         <button
//           onClick={generateTimeTable}
//           className="bg-[#1976d2] text-white px-4 py-2 rounded w-full hover:bg-white hover:text-[#1976d2] transition-all"
//         >
//           Auto Generate (All Time Tables)
//         </button>
//       </div>

//       {/* Time Table Display */}
//       {timeTable.length > 0 && (
//         <div className="mt-6 bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
//           <h3 className="text-lg font-bold text-center mb-4">
//             Generated Time Table
//           </h3>

         
//         </div>
//       )}
//     </div>
//   );
// };

// export default TimeTableGenerator;


import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"; // For API call

const TimeTableGenerator = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeTable, setTimeTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateTimeTable = async () => {
    if (startDate > endDate) {
      alert("Start date cannot be after End date!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("https://timetable-generator-latest.onrender.com/api/timetable/generate", {
        startDate,
        endDate,
      });

      setTimeTable(response.data); // Expecting an array of objects
    } catch (err) {
      console.error(err);
      setError("Failed to fetch timetable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-blue-50 min-h-screen p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          Time Table Generator
        </h2>

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

        <button
          onClick={generateTimeTable}
          className="bg-[#1976d2] text-white px-4 py-2 rounded w-full hover:bg-white hover:text-[#1976d2] transition-all"
          disabled={loading}
        >
          {loading ? "Generating..." : "Auto Generate (All Time Tables)"}
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      {timeTable.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl overflow-auto">
          <h3 className="text-lg font-bold text-center mb-4">
            Generated Time Table
          </h3>

          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Task</th>
              </tr>
            </thead>
            <tbody>
              {timeTable.map((entry, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{entry.date}</td>
                  <td className="border px-4 py-2">{entry.task}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TimeTableGenerator;
