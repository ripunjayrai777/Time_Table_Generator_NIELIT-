import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaTrashAlt, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Store/apiClient";

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [dayTimeSlots, setDayTimeSlots] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [form, setForm] = useState({
    subject: "",
    teacher: "",
    studentGroup: "",
    dayTimeSlot: {
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      active: true,
    },
    room: {
      name: "",
      capacity: 0,
      available: true,
    },
    lab: false,
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchLessons();
    fetchDayTimeSlots();
    fetchRooms();
  }, []);

  const fetchLessons = async () => {
    try {
      const res = await api.get("/lessons/all");
      setLessons(res.data);
    } catch (err) {
      toast.error("Failed to fetch lessons");
    }
  };

  const fetchDayTimeSlots = async () => {
    try {
      const res = await api.get("/daytimeslots/all");
      setDayTimeSlots(res.data);
    } catch (err) {
      toast.error("Failed to fetch time slots");
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms/all");
      setRooms(res.data);
    } catch (err) {
      toast.error("Failed to fetch rooms");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("dayTimeSlot.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        dayTimeSlot: {
          ...prev.dayTimeSlot,
          [key]: type === "checkbox" ? checked : value,
        },
      }));
    } else if (name.startsWith("room.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        room: {
          ...prev.room,
          [key]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await api.put(`/lessons/update/${editingId}`, form);
        toast.success("Lesson updated!");
      } else {
        const res = await api.post("/lessons/add", form);
        setLessons([...lessons, res.data]);
        toast.success("Lesson added!");
      }
      setForm({
        subject: "",
        teacher: "",
        studentGroup: "",
        dayTimeSlot: {
          dayOfWeek: "",
          startTime: "",
          endTime: "",
          active: true,
        },
        room: {
          name: "",
          capacity: 0,
          available: true,
        },
        lab: false,
      });
      setEditingId(null);
      fetchLessons();
    } catch (err) {
      toast.error("Error saving lesson");
    }
  };

  const handleEdit = (lesson) => {
    const { dayTimeSlot, room, ...rest } = lesson;
    const cleanedForm = {
      ...rest,
      dayTimeSlot: {
        dayOfWeek: dayTimeSlot.dayOfWeek,
        startTime: dayTimeSlot.startTime,
        endTime: dayTimeSlot.endTime,
        active: dayTimeSlot.active,
      },
      room: {
        name: room.name,
        capacity: room.capacity,
        available: room.available,
      },
    };
    setForm(cleanedForm);
    setEditingId(lesson.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/lessons/delete/${id}`);
      setLessons(lessons.filter((lesson) => lesson.id !== id));
      toast.success("Lesson deleted!");
    } catch (err) {
      toast.error("Failed to delete lesson");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Lesson Form</h2>

          {["subject", "teacher", "studentGroup"].map((name) => (
            <input
              key={name}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
            />
          ))}

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Day Time Slot</h3>
            <select
              name="dayTimeSlot.dayOfWeek"
              value={form.dayTimeSlot.dayOfWeek}
              onChange={handleChange}
              className="input w-full mb-3 px-4 py-2 border rounded-md"
            >
              <option value="">Select Day</option>
              {dayTimeSlots.map((slot) => (
                <option key={slot.id} value={slot.dayOfWeek}>
                  {slot.dayOfWeek}
                </option>
              ))}
            </select>
            <div className="flex gap-3">
              <input
                name="dayTimeSlot.startTime"
                value={form.dayTimeSlot.startTime}
                onChange={handleChange}
                placeholder="Start Time"
                className="input w-full px-4 py-2 border rounded-md"
              />
              <input
                name="dayTimeSlot.endTime"
                value={form.dayTimeSlot.endTime}
                onChange={handleChange}
                placeholder="End Time"
                className="input w-full px-4 py-2 border rounded-md"
              />
            </div>
            <label className="inline-flex items-center mt-2">
              <input
                type="checkbox"
                name="dayTimeSlot.active"
                checked={form.dayTimeSlot.active}
                onChange={handleChange}
                className="mr-2"
              />
              Active
            </label>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Classroom Info</h3>
            <select
              name="room.name"
              value={form.room.name}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded-md"
            >
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.name}>
                  {room.name}
                </option>
              ))}
            </select>
            <input
              name="room.capacity"
              value={form.room.capacity}
              onChange={handleChange}
              type="number"
              placeholder="Classroom Capacity"
              className="w-full mb-3 px-4 py-2 border rounded-md"
            />
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="room.available"
                checked={form.room.available}
                onChange={handleChange}
                className="mr-2"
              />
              Classroom is Available
            </label>
          </div>

          <label className="block mt-3">
            <input
              type="checkbox"
              name="lab"
              checked={form.lab}
              onChange={handleChange}
              className="mr-2"
            />
            This classroom is also a Lab.
          </label>

          <button
            onClick={handleSubmit}
            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            {editingId ? "Update Lesson" : "Add Lesson"}
          </button>
        </div>

        {/* Table stays same */}
        {/* ... */}
      </div>
    </div>
  );
}

export default Lessons;


//adsfkfdskj