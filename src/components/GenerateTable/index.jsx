
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { Loader2 } from "lucide-react";

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
      const params = new URLSearchParams({
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      });
      const res = await fetch(`/api/timetable?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch timetable");
      const data = await res.json();
      setTimeTable(data);
    } catch (err) {
      setError(err.message);
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
          <label className="block text-gray-700 mb-1">Select Start Date:-</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Select End Date:-</label>
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
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl">
          <h3 className="text-lg font-bold text-center mb-6">
            Generated Time Table
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {timeTable.map((day) => (
              <Card key={day.date} variant="outlined" sx={{ boxShadow: 2 }}>
                <CardHeader
                  title={new Date(day.date).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                  titleTypographyProps={{ fontWeight: "bold" }}
                />
                <CardContent>
                  {(day.tasks || []).map((task, idx) => (
                    <div
                      key={idx}
                      style={{
                        borderLeft: "4px solid #1976d2",
                        paddingLeft: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <Typography variant="body2" fontWeight="bold">
                        {task.time}
                      </Typography>
                      <Typography variant="body2">{task.title}</Typography>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTableGenerator;
