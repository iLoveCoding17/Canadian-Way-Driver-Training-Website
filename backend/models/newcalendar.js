import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema({
  user: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const newCalendar = mongoose.models.newCalendar || mongoose.model("newCalendar", calendarSchema);

export default newCalendar;
