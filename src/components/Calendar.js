import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Button from "./Button";
import Clock from "./Clock";
import { Form } from "react-bootstrap";

export default function BookingCalendar({
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  maxEndTime,
  isValidBookingDuration,
  instructors,
  handleBooking
}) {
  const [chosenInstructor, setChosenInstructor] = useState(null);



  return (
    <div className="card py-2 shadow-sm border border-white d-flex flex-column mb-5 border border-3">
      {/* Calendar Section */}
      <div className="w-100">
        <Calendar onChange={setDate} value={date} className="w-100 border-0" />
      </div>

      <div className="text-center mt-2 text-bold">Selected Date: {date.toDateString()}</div>

      {/* Clock */}
      <div>
        <Clock />
      </div>

      {/* Time Selection */}
      <div className="d-flex flex-column gap-3 px-5 py-3">
        <label>Start Time</label>
        <input
          type="time"
          className="form-control"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label>End Time</label>
        <input
          type="time"
          className="form-control"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          max={maxEndTime}
        />

        {/* Instructor Dropdown */}
        <Form.Select
          onChange={(e) => setChosenInstructor(e.target.value)}
          value={chosenInstructor || ""}
          required
        >
          <option value="">Choose your instructor</option>
          {instructors.map((instructor) => (
            <option key={instructor._id} value={instructor.name}>
              {instructor.fname} {instructor.lname}
            </option>
          ))}
        </Form.Select>

        {/* Validation Notes */}
        {!isValidBookingDuration(startTime, endTime) && (
          <small className="text-danger">
            Booking must be 2 hours or less
          </small>
        )}
        <small className="text-muted">
          Max allowed end time for this date: {maxEndTime}
        </small>
      </div>

      {/* Booking Button */}
      <div className="d-flex justify-content-center mt-3">
						<Button
							click={handleBooking}
							disabled={!isValidBookingDuration(startTime, endTime)}
						>
							Create Booking
						</Button>
					</div>
    </div>
  );
}
