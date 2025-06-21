// import React, { useState, useRef } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Typography,
//   Button,
// } from "@mui/material";
// import { Loader2 } from "lucide-react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import * as XLSX from "xlsx";

// const TimeTableGenerator = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [timeTable, setTimeTable] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const tableRef = useRef();

//   const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
//   const timeSlots = [
//     "09:00-10:00",
//     "10:00-11:00",
//     "11:00-12:00",
//     "12:00-13:00",
//     "13:00-14:00",
//     "14:00-15:00",
//   ];

//   const generateTimeTable = async () => {
//     if (startDate > endDate) {
//       alert("Start date cannot be after End date!");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const params = new URLSearchParams({
//         start: startDate.toISOString(),
//         end: endDate.toISOString(),
//       });
//       const res = await fetch(`/api/timetable?${params.toString()}`);
//       if (!res.ok) throw new Error("Failed to fetch timetable");
//       const data = await res.json();
//       setTimeTable(data.length > 0 ? data : []);
//     } catch (err) {
//       setError(err.message);
//       setTimeTable([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --------- Export as PDF ----------
//   const exportToPDF = () => {
//     const input = tableRef.current;
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("l", "mm", "a4");
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("timetable.pdf");
//     });
//   };

//   // --------- Export as Excel ----------
//   const exportToExcel = () => {
//     const worksheetData = [
//       ["Day / Time", ...timeSlots],
//       ...daysOfWeek.map((day) => {
//         const dayData =
//           timeTable.find((d) => d.day?.toLowerCase() === day.toLowerCase()) || {};
//         const taskMap = {};
//         (dayData.tasks || []).forEach((task) => {
//           taskMap[task.time] = `${task.title}\n${task.professor}\n${task.room}`;
//         });

//         return [
//           day.toUpperCase(),
//           ...timeSlots.map((slot) => taskMap[slot] || "Free"),
//         ];
//       }),
//     ];

//     const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "TimeTable");
//     XLSX.writeFile(workbook, "timetable.xlsx");
//   };

//   return (
//     <div className="flex flex-col items-center bg-blue-50 min-h-screen p-6">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4 text-center">
//           Time Table Generator
//         </h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Select Start Date:</label>
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             className="border p-2 w-full rounded"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Select End Date:</label>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             className="border p-2 w-full rounded"
//           />
//         </div>

//         <Button
//           onClick={generateTimeTable}
//           variant="contained"
//           color="primary"
//           fullWidth
//           disabled={loading}
//           startIcon={loading && <Loader2 className="animate-spin" />}
//         >
//           {loading ? "Generating…" : "Auto Generate (All Time Tables)"}
//         </Button>

//         {error && (
//           <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
//         )}
//       </div>

//       {(timeTable.length >= 0 || !loading) && (
//         <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full overflow-auto">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-bold text-center w-full">
//               Generated Time Table
//             </h3>
//           </div>

//           <div className="flex gap-4 justify-center mb-4">
//             <Button variant="outlined" onClick={exportToPDF}>
//               Export to PDF
//             </Button>
//             <Button variant="outlined" onClick={exportToExcel}>
//               Export to Excel
//             </Button>
//           </div>

//           <div ref={tableRef}>
//             <table className="table-auto w-full border border-gray-300 text-center">
//               <thead>
//                 <tr className="bg-green-600 text-white">
//                   <th className="border px-4 py-2">Day / Time</th>
//                   {timeSlots.map((slot) => (
//                     <th key={slot} className="border px-4 py-2">
//                       {slot}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {daysOfWeek.map((day) => {
//                   const dayData =
//                     timeTable.find(
//                       (d) => d.day?.toLowerCase() === day.toLowerCase()
//                     ) || {};
//                   const taskMap = {};
//                   (dayData.tasks || []).forEach((task) => {
//                     taskMap[task.time] = task;
//                   });

//                   return (
//                     <tr key={day} className="hover:bg-gray-50">
//                       <td className="border px-4 py-2 font-semibold text-blue-700">
//                         {day.toUpperCase()}
//                       </td>
//                       {timeSlots.map((slot) => {
//                         const task = taskMap[slot];
//                         return (
//                           <td key={slot} className="border px-2 py-2">
//                             {task ? (
//                               <div className="p-2 rounded bg-gradient-to-r from-red-400 to-purple-500 text-white shadow text-sm">
//                                 <div className="font-bold">{task.title}</div>
//                                 <div className="text-xs">{task.professor}</div>
//                                 <div className="text-xs">{task.room}</div>
//                               </div>
//                             ) : (
//                               <span className="text-gray-400">Free</span>
//                             )}
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TimeTableGenerator;

// ---------------------------------------------------------------------------------------------------------------------------------



// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Typography,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import { Loader2 } from "lucide-react";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import * as XLSX from "xlsx";

// const subjectColors = {
//   "Data Structures": "from-red-400 to-pink-500",
//   "Operating Systems": "from-blue-500 to-indigo-600",
//   "Algorithms": "from-green-400 to-emerald-500",
//   "Database Systems": "from-purple-500 to-fuchsia-500",
//   "DS Lab": "from-orange-400 to-yellow-500",
//   default: "from-gray-400 to-gray-600",
// };

// const TimeTableGenerator = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [timeTable, setTimeTable] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [filterSubject, setFilterSubject] = useState("");
//   const [filterProfessor, setFilterProfessor] = useState("");
//   const [groupByProfessor, setGroupByProfessor] = useState(false);

//   const generateTimeTable = async () => {
//     if (startDate > endDate) {
//       alert("Start date cannot be after End date!");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const params = new URLSearchParams({
//         start: startDate.toISOString(),
//         end: endDate.toISOString(),
//       });
//       const res = await fetch(`/api/timetable?${params.toString()}`);
//       if (!res.ok) throw new Error("Failed to fetch timetable");
//       const data = await res.json();
//       setTimeTable(data.length ? data : generateEmptyTimeTable());
//     } catch (err) {
//       setError(err.message);
//       setTimeTable(generateEmptyTimeTable());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateEmptyTimeTable = () => {
//     const emptyData = [];
//     const daysToGenerate = 7;
//     for (let i = 0; i < daysToGenerate; i++) {
//       const date = new Date();
//       date.setDate(startDate.getDate() + i);
//       emptyData.push({ date: date.toISOString(), tasks: [] });
//     }
//     return emptyData;
//   };

//   const handlePDFExport = async () => {
//     const element = document.querySelector(".timetable-container");
//     if (!element) return;
//     const canvas = await html2canvas(element);
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("l", "mm", "a4");
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("timetable.pdf");
//   };

//   const handleExcelExport = async () => {
//     const rows = timeTable.flatMap((day) => {
//       return (day.tasks || []).map((task) => [
//         new Date(day.date).toLocaleDateString(),
//         task.time,
//         task.title,
//         task.professor || "N/A",
//       ]);
//     });

//     const wb = XLSX.utils.book_new();
//     const ws = XLSX.utils.aoa_to_sheet([
//       ["Date", "Time", "Subject", "Professor"],
//       ...rows,
//     ]);
//     XLSX.utils.book_append_sheet(wb, ws, "Timetable");
//     XLSX.writeFile(wb, "timetable.xlsx");
//   };

//   const groupedByProfessor = () => {
//     const professorMap = {};
//     timeTable.forEach((day) => {
//       (day.tasks || []).forEach((task) => {
//         if (!professorMap[task.professor]) professorMap[task.professor] = [];
//         professorMap[task.professor].push({ ...task, date: day.date });
//       });
//     });
//     return professorMap;
//   };

//   return (
//     <div className="flex flex-col items-center bg-blue-50 min-h-screen p-6">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4 text-center">Time Table Generator</h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Select Start Date:-</label>
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             className="border p-2 w-full rounded"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Select End Date:-</label>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             className="border p-2 w-full rounded"
//           />
//         </div>

//         <Button
//           onClick={generateTimeTable}
//           variant="contained"
//           color="primary"
//           fullWidth
//           disabled={loading}
//           startIcon={loading && <Loader2 className="animate-spin" />}
//         >
//           {loading ? "Generating…" : "Auto Generate (All Time Tables)"}
//         </Button>

//         {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
//       </div>

//       {timeTable.length > 0 && (
//         <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl timetable-container">
//           <h3 className="text-lg font-bold text-center mb-6">Generated Time Table</h3>

//           <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
//             <div>
//               <label className="text-sm font-semibold">Filter by Subject:</label>
//               <select
//                 onChange={(e) => setFilterSubject(e.target.value)}
//                 className="ml-2 border p-1 rounded"
//               >
//                 <option value="">All</option>
//                 {[...new Set(timeTable.flatMap(d => d.tasks?.map(t => t.title)))].filter(Boolean).map((subject) => (
//                   <option key={subject} value={subject}>{subject}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="text-sm font-semibold">Filter by Professor:</label>
//               <select
//                 onChange={(e) => setFilterProfessor(e.target.value)}
//                 className="ml-2 border p-1 rounded"
//               >
//                 <option value="">All</option>
//                 {[...new Set(timeTable.flatMap(d => d.tasks?.map(t => t.professor)))].filter(Boolean).map((prof) => (
//                   <option key={prof} value={prof}>{prof}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex gap-2">
//               <Button variant="outlined" color="secondary" onClick={handlePDFExport}>Export PDF</Button>
//               <Button variant="outlined" color="success" onClick={handleExcelExport}>Export Excel</Button>
//               <Button variant="outlined" onClick={() => setGroupByProfessor(!groupByProfessor)}>
//                 {groupByProfessor ? "View by Date" : "View by Professor"}
//               </Button>
//             </div>
//           </div>

//           {groupByProfessor ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {Object.entries(groupedByProfessor()).map(([professor, tasks]) => (
//                 <Card key={professor} variant="outlined" sx={{ boxShadow: 2 }}>
//                   <CardHeader title={professor} titleTypographyProps={{ fontWeight: "bold" }} />
//                   <CardContent>
//                     {tasks.map((task, idx) => (
//                       <div
//                         key={idx}
//                         className={`p-2 rounded bg-gradient-to-r ${
//                           subjectColors[task.title] || subjectColors.default
//                         } text-white shadow text-sm mb-2`}
//                       >
//                         <div className="font-bold">{task.time}</div>
//                         <div>{task.title}</div>
//                         <div className="text-xs italic">{new Date(task.date).toLocaleDateString()}</div>
//                       </div>
//                     ))}
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {timeTable.map((day) => (
//                 <Card key={day.date} variant="outlined" sx={{ boxShadow: 2 }}>
//                   <CardHeader
//                     title={new Date(day.date).toLocaleDateString(undefined, {
//                       weekday: "short",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                     titleTypographyProps={{ fontWeight: "bold" }}
//                   />
//                   <CardContent>
//                     {(day.tasks || []).length === 0 ? (
//                       <Typography variant="body2" color="textSecondary">No tasks</Typography>
//                     ) : (
//                       day.tasks
//                         .filter(
//                           (task) =>
//                             (!filterSubject || task.title === filterSubject) &&
//                             (!filterProfessor || task.professor === filterProfessor)
//                         )
//                         .map((task, idx) => (
//                           <div
//                             key={idx}
//                             className={`p-2 rounded bg-gradient-to-r ${
//                               subjectColors[task.title] || subjectColors.default
//                             } text-white shadow text-sm mb-2`}
//                           >
//                             <div className="font-bold">{task.time}</div>
//                             <div>{task.title}</div>
//                             <div className="text-xs italic">{task.professor || ""}</div>
//                           </div>
//                         ))
//                     )}
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TimeTableGenerator;

// ------------------------------------------------------------------------------------------------------------------------------------




import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button
} from "@mui/material";
import { Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

const TimeTableGenerator = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeTable, setTimeTable] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const tableRef = useRef();

  const generateTimeTable = async () => {
    if (startDate > endDate) {
      alert("Start date cannot be after End date!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      });

      const res = await fetch(`/api/timetable?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch timetable");
      const data = await res.json();

      const { timeSlots: apiSlots, lessons } = data;

      const activeSlots = apiSlots.filter((slot) => slot.active);
      setTimeSlots(activeSlots);

      const uniqueDays = [
        ...new Set(activeSlots.map((slot) => slot.dayOfWeek)),
      ];
      setDaysOfWeek(uniqueDays);

      const lessonsByDay = {};
      lessons.forEach((lesson) => {
        const day = lesson.dayTimeSlot.dayOfWeek;
        const time = `${lesson.dayTimeSlot.startTime}-${lesson.dayTimeSlot.endTime}`;
        if (!lessonsByDay[day]) lessonsByDay[day] = {};
        lessonsByDay[day][time] = {
          time,
          title: lesson.subject,
          professor: lesson.teacher,
          room: lesson.room?.name || "N/A",
        };
      });

      const formatted = uniqueDays.map((day) => {
        const slotsForDay = activeSlots.filter((s) => s.dayOfWeek === day);
        return {
          day,
          tasks: slotsForDay.map((slot) => {
            const timeLabel = `${slot.startTime}-${slot.endTime}`;
            return lessonsByDay[day]?.[timeLabel] || { time: timeLabel };
          }),
        };
      });

      setTimeTable(formatted);
    } catch (err) {
      setError(err.message);
      setTimeTable([]);
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = () => {
    const input = tableRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("timetable.pdf");
    });
  };

  const exportToExcel = () => {
    const slotLabels = timeSlots
      .filter((s) => s.active)
      .map((s) => `${s.startTime}-${s.endTime}`);
    const worksheetData = [
      ["Day / Time", ...slotLabels],
      ...timeTable.map((dayObj) => {
        return [
          dayObj.day.toUpperCase(),
          ...dayObj.tasks.map((task) =>
            task.title
              ? `${task.title}\n${task.professor}\n${task.room}`
              : "Free"
          ),
        ];
      }),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TimeTable");
    XLSX.writeFile(workbook, "timetable.xlsx");
  };

  return (
    <div className="flex flex-col items-center bg-blue-50 min-h-screen p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          Time Table Generator
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Select Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Select End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border p-2 w-full rounded"
          />
        </div>

        <Button
          onClick={generateTimeTable}
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          startIcon={loading && <Loader2 className="animate-spin" />}
        >
          {loading ? "Generating…" : "Auto Generate (All Time Tables)"}
        </Button>

        {error && (
          <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
        )}
      </div>

      {timeTable.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-center w-full">
              Generated Time Table
            </h3>
          </div>

          <div className="flex gap-4 justify-center mb-4">
            <Button variant="outlined" onClick={exportToPDF}>
              Export to PDF
            </Button>
            <Button variant="outlined" onClick={exportToExcel}>
              Export to Excel
            </Button>
          </div>

          <div ref={tableRef}>
            <table className="table-auto w-full border border-gray-300 text-center">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="border px-4 py-2">Day / Time</th>
                  {timeSlots
                    .filter((s) => s.active)
                    .map((slot) => (
                      <th
                        key={`${slot.startTime}-${slot.endTime}`}
                        className="border px-4 py-2"
                      >
                        {`${slot.startTime}-${slot.endTime}`}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {timeTable.map((dayObj) => (
                  <tr key={dayObj.day} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 font-semibold text-blue-700">
                      {dayObj.day.toUpperCase()}
                    </td>
                    {dayObj.tasks.map((task, idx) => (
                      <td key={idx} className="border px-2 py-2">
                        {task.title ? (
                          <div className="p-2 rounded bg-gradient-to-r from-red-400 to-purple-500 text-white shadow text-sm">
                            <div className="font-bold">{task.title}</div>
                            <div className="text-xs">{task.professor}</div>
                            <div className="text-xs">{task.room}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">Free</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTableGenerator;
