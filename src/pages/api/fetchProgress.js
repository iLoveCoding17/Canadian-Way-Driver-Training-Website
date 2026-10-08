import dbConnect from "../../../backend/dbconnect.js";
import PurchaseCourseModel from "../../../backend/models/PurchaseCourseModel.js";
import newcalendar from "../../../backend/models/newcalendar.js";

export default async function handler(req, res) {
	await dbConnect();

	const email = req.body.email;

	try {
		let courseDocument = await PurchaseCourseModel.findOne({ email });

        if(courseDocument == null) {
			return res.status(200).json({ userProgress: 0, remainingHours: 0, hasCourse: false });
		}

		let courseName = courseDocument.courseName;
		let courseHours;

        if(courseName === "On the Road Practice") {
			courseHours = 2;
        } else if(courseName === "Defensive Driving (Driver Improvement)") {
			courseHours = 6;
        } else if(courseName === "Full Driving Course") {
			courseHours = 35;
		}

		let userBookings = await newcalendar.find({ user: email });

		let completedHours = 0;

        for (let userBooking of userBookings) {
			let startTimeValues = userBooking.startTime.split(":");
			let endTimeValues = userBooking.endTime.split(":");

			let startTimeHour = parseInt(startTimeValues[0]);
			let startTimeMin = parseInt(startTimeValues[1]);

			let endTimeHour = parseInt(endTimeValues[0]);
			let endTimeMin = parseInt(endTimeValues[1]);

			let startTimeTotalMins = startTimeHour * 60 + startTimeMin;
			let endTimeTotalMins = endTimeHour * 60 + endTimeMin;

			let sessionDuration = (endTimeTotalMins - startTimeTotalMins) / 60;

            if(sessionDuration > 0) {
				completedHours += sessionDuration;
			}
		}

		let userProgress = Math.round((completedHours / courseHours) * 100);
		let remainingHours = courseHours - completedHours;

		res.status(200).json({ userProgress, remainingHours, hasCourse: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error fetching user progress" });
	}
}
