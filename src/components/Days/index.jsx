import { useState } from "react";

export default function DaysManager() {
  const [dayName, setDayName] = useState("");
  const [dayStatus, setDayStatus] = useState(false);
  const [days, setDays] = useState([
    { id: 1, name: "MONDAY", status: true },
    { id: 2, name: "TUESDAY", status: true },
    { id: 3, name: "WEDNESDAY", status: true },
    { id: 4, name: "THURSDAY", status: true },
    { id: 5, name: "FRIDAY", status: true },
    { id: 6, name: "SATURDAY", status: false },
    { id: 7, name: "SUNDAY", status: false },
  ]);

  const handleSave = () => {
    if (dayName.trim() !== "") {
      setDays([
        ...days,
        { id: days.length + 1, name: dayName.toUpperCase(), status: dayStatus },
      ]);
      setDayName("");
      setDayStatus(false);
    }
  };

  const handleStatusChange = (id) => {
    setDays(
      days.map((day) => (day.id === id ? { ...day, status: !day.status } : day))
    );
  };

  const handleRemove = (id) => {
    setDays(days.filter((day) => day.id !== id));
  };

  return (
    <div className="p-10 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen flex gap-6">
      <div className="w-full md:w-1/3 bg-blue-100 p-6 rounded-lg shadow-md ">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Enter Day</h2>
        <input
          type="text"
          placeholder="Day Name"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
          value={dayName}
          onChange={(e) => setDayName(e.target.value)}
        />
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={dayStatus}
            onChange={(e) => setDayStatus(e.target.checked)}
          />
          Day Status
        </label>
        <div className="flex gap-4">
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-yellow-600 transition-all"
            onClick={() => {
              setDayName("");
              setDayStatus(false);
            }}
          >
            Clear
          </button>
          <button
            className="bg-[#1976d2] text-white py-2 px-4 rounded-lg hover:bg-white hover:text-[#1976d2] transition-all"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>

      <div className="w-full md:w-2/3 p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-semibold text-[#1976d2] mb-4">
          Days List
        </h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#1976d2] text-gray-800">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Day</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr
                  key={day.id}
                  className={`border-b ${
                    day.status ? "bg-blue-100" : "bg-white"
                  }`}
                >
                  <td className="p-3">{day.id}</td>
                  <td className="p-3">{day.name}</td>
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={day.status}
                      onChange={() => handleStatusChange(day.id)}
                    />
                  </td>
                  <td className="p-3">
                    <button
                      className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-800"
                      onClick={() => handleRemove(day.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
