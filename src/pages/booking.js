/**
 * @file booking.js
 * @description booking.js is a booking page which is mostly used for handling user/booking related opeartions.
 * 
 * This file includes operations for:
 * - Allowing the user to schedule a driving lesson for themselves.
 * - Allowing the user to reschedule thier driving lesosn.
 * - Displaying messages and annoucements which are sent to the user.
 * - Redirecting the user to buy driving courses.
 * - Displaying how much progress of a course the user has finished.
 * - Scheduling reminder emails to be sent out to the user 24 hours before thier lesson.
 */


import Layout from "../components/Layout";
import BookingCalendar from "@/components/Calendar";
import Button from "@/components/Button";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { set } from "mongoose";

export default function Index() {
	const router = useRouter();
	const [instructors, setInstructors] = useState([]);
	const [messages, setMessages] = useState([]);

	const [date, setDate] = useState(new Date());
	const [startTime, setStartTime] = useState("08:00");
	const [endTime, setEndTime] = useState("08:00");
	const [maxEndTime, setMaxEndTime] = useState("18:00");
	const [chosenInstructor, setChosenInstructor] = useState(null);
	const [userProgress, setUserProgress] = useState(0);
	const [remainingHours, setRemainingHours] = useState(0);
	const [hasCourse, setHasCourse] = useState(true);
	const [lesson, setLesson] = useState(null);
	const [courseInfo, setCourseInfo] = useState(null);

	const emailParameter = router.query.email;

	//Used if the user clicks on the feedback button, they will be redirected to the feedback page.
	const feedbackBtnOnClick = () => {
		router.push("/Feedback");
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/");
		}

		//Getting the user data and information.
		const userData = localStorage.getItem("userData")
		const parsedUserData = JSON.parse(userData);
		const fullName = parsedUserData.firstName + " " + parsedUserData.lastName;
		const gender = parsedUserData.gender;

		//Displaying the users name on the page.
		document.getElementById("name").innerHTML = fullName;

		//Fetching the instructors informations (note: only male instructors will be displayed for males, and only female instructors will be displayer for females).
		const fetchInstructors = async () => {
			try {
				const response = await axios.post("/api/instructors", { gender: gender });
				setInstructors(response.data);
			} catch (error) {
				console.error("Fetching instructors failed ", error);
			}
		};

		//Fetching messages sent to the user by the admin.
		const fetchMessages = async () => {
			try {
				const response = await axios.post("/api/fetchMessages", { email: parsedUserData.email });
				setMessages(response.data.messages);
			} catch (error) {
				console.error("Fetching messages failed", error);
			}
		};

		const fetchLesson = async () => {
			try {
				const response = await axios.get("/api/bookingAPI", { params: { email: parsedUserData.email } });
				if (response.data.success) {
					setLesson({ date: response.data.booking.date, time: response.data.booking.startTime});
				}
			} catch {
				setLesson(null);
			}
		};

		const fetchCourseInfo = async () => {
			try {
				const response = await axios.post("/api/fetchCourseInfo", { email: parsedUserData.email });
				setCourseInfo({ name: response.data.courseName, price: response.data.coursePrice });
			} catch {
				setCourseInfo(null);
			}
		};

		//Fetching the progress for the user on how much they have completed thier driving course.
		const fetchProgress = async () => {
			try {
				const response = await axios.post("/api/fetchProgress", { email: parsedUserData.email });
				setUserProgress(response.data.userProgress);
				setRemainingHours(response.data.remainingHours);
				setHasCourse(response.data.hasCourse);
			} catch (error) {
				console.error("Fetching user progress failed", error);
			}
		}

		fetchInstructors();
		fetchMessages();
		fetchLesson();
		fetchCourseInfo();
		fetchProgress();
	}, [router]);

	//Function used to handle rescheduling.
	const handleReschedule = async () => {
		const userData = JSON.parse(localStorage.getItem("userData") || "{}");
		const user = userData.name || userData.username || userData.email;

		try {
			const response = await axios.delete("/api/bookingAPI", { data: { user } });
			if (response.data.success) {
				alert("Booking is deleted, you can rebook now");
			} else {
				alert("Nothing to delete");
			}
		} catch (error) {
			console.error("Failed to reschedule", error);
			alert("Reschedule failed!");
		}
	};

	//Function used to check if it is winter time (as the time which the driving lessons can be booked is different during the winter).
	const isWinter = (d) => {
		const m = d.getMonth();
		return m === 10 || m === 11 || m === 0 || m === 1;
	};

	//Saving the booking hour for the user.
	useEffect(() => {
		if (isWinter(date)) {
			setMaxEndTime("17:00");
		} else {
			setMaxEndTime("18:00");
		}
	}, [date]);

	//Function used to check if the the users booking has a valid time slot (ie: not longer than 2 hours).
	const isValidBookingDuration = (start, end) => {
		const [startHour, startMin] = start.split(":").map(Number);
		const [endHour, endMin] = end.split(":").map(Number);

		const startTotal = startHour * 60 + startMin;
		const endTotal = endHour * 60 + endMin;

		return endTotal - startTotal <= 120;
	};

	//This function is used to book a booking for the users, and checks for if the booking is valid. It also calls the scheduleBookingEmailNotification function
	//to schedule a reminder email to be sent to the user 24 hours before thier lesson.
	const handleBooking = async () => {
		if (!isValidBookingDuration(startTime, endTime)) return;

		const userData = JSON.parse(localStorage.getItem("userData") || "{}");
		const user = userData.name || userData.username || userData.email;

		//Getting the user data
		const userPerson = localStorage.getItem("userData")

		//parsing the data for easier use
		const parsedUserPerson = JSON.parse(userPerson);

		//Getting the users first and last name
		const personName = parsedUserPerson.firstName + " " + parsedUserPerson.lastName;

		try {
			const response = await fetch("/api/bookingAPI", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					user,
					date,
					startTime,
					endTime,
					chosenInstructor,
				}),
			});

			if (!response.ok) throw new Error("Booking failed!");

			scheduleBookingEmailNotification(user, date, startTime, endTime, personName);
			alert("Booking created and has been sent to the admin for approval!");
		} catch (error) {
			console.error("Booking error:", error);
			alert("Booking failed.");
		}
	};

	//This function will schedule the email and put it on MongoDB, on MongoDB there is a trigger which will
	//triggers every hour which checks if the scheduled lesson is in less than 24 hours, and if it is it will
	//send the user a notification.
	const scheduleBookingEmailNotification = async (user, date, startTime, endTime, userName)=> {
		
		let subjectLine="Upcoming Driving Lesson"
		let dateShort = date.toLocaleString("en-US", {month: "long", day: "numeric", year: "numeric"})

		//Changing this variable to change the message which will be displayed to the user
		let emailMessage = userName+ ", your next driving lesson is on " +dateShort+", it begins at " +startTime+" and will end at "+endTime +".";
	
		const dateBefore = new Date(date-86400000)
		const response = await axios.post("/api/emailSched", {
			subject: subjectLine,
			message: emailMessage,
			email: user,
			sendDate: dateBefore,
			sent: false,
		});
	};

	return (
		<Layout>
			<div className="d-flex flex-column">
				<h1 className="fw-bold1 px-4">
					Welcome <p id="name"></p>
				</h1>
				<p className="text-muted px-4">Ready to book your next lesson?</p>

				{/* Main Content Grid - Changed to column on mobile */}
				<div className="d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-lg-around gap-4 px-3">
					{/* Calendar Section */}
					<BookingCalendar
						date={date}
						setDate={setDate}
						startTime={startTime}
						setStartTime={setStartTime}
						endTime={endTime}
						setEndTime={setEndTime}
						maxEndTime={maxEndTime}
						isValidBookingDuration={isValidBookingDuration}
						instructors={instructors}
						chosenInstructor={chosenInstructor}
						setChosenInstructor={setChosenInstructor}
						handleBooking={handleBooking}
					/>

					{/* Create Booking Button */}
					

					{/* Next Lesson & Plan Section */}
					<div className="d-flex flex-column flex-md-row flex-lg-column justify-content-between gap-3 w-100 w-lg-auto">
						<div className="bg-white shadow rounded-4 text-center p-4 w-100">
							<h5 className="fw-bold">Your next lesson is...</h5>
							{lesson ? (
								<>
									<p className="text-muted mt-2">{new Date(lesson.date).toDateString()}</p>
									<p className="text-muted mt-3">{lesson.time} EST</p>
								</>
							) : (
								<p className="text-muted mt-2">No lesson. Book your next lesson...</p>
							)}
							<Button variant="secondary" click={handleReschedule}>
								Reschedule
							</Button>
						</div>

						{/* Plan Section */}
						<div className="bg-white shadow rounded-4 text-center p-4 w-100">
							<h5 className="fw-bold">Your plan is...</h5>
							{courseInfo ? (
								<>
									<p className="text-muted mt-2">{courseInfo.name}</p>
									<p className="text-muted mt-3">${courseInfo.price}</p>
								</>
							) : (
								<p className="text-muted mt-2">You have no plan...Buy a course</p>
							)}
						</div>
					</div>

					{/* Course Progress & Messages Section - Side by side on medium screens */}
					<div className="d-flex flex-column flex-md-row flex-lg-column gap-3 w-100 w-lg-auto">
						{/* Course Progress Section */}
						<div className="progress-container bg-white shadow rounded-4 text-center p-4 w-100">
							{hasCourse === false ? (
								<div>
									<h5 className="fw-bold mb-3">You did not buy course yet...</h5>
									<Button click={() => router.push("/BuyCourse")}>Buy Course</Button>
								</div>
							) : (
								<div>
									<h5 className="fw-bold">Course Progress</h5>
									<p className="display-4 fw-bold text-danger">{userProgress}%</p>
									{userProgress > 0 ? (
										<p className="text-muted mt-4">
											Great job! You have {remainingHours} hours left before your road test!
										</p>
									) : (
										<p className="text-muted mt-4">
											You did not make any progress. Book a session to start making progress!
										</p>
									)}
									<div className="progress">
										<div
											className="progress-bar bg-danger"
											style={{ width: `${userProgress}%` }}
										></div>
									</div>
									<div className="mt-3">
										{userProgress >= 50 ? (
											<Button click={feedbackBtnOnClick}>Add Feedback</Button>
										) : null}
									</div>
								</div>
							)}
						</div>

						{/* Messages Section */}
						<div className="messages-container bg-white shadow rounded-4 text-center p-4 w-100">
							<h5 className="fw-bold">Messages</h5>

							{messages.length > 0 ? ( 
								<div className="list-group">
									{messages.map((userMessage) => ( 
										<div className="list-group-item" key={userMessage._id}>
											{userMessage.createdAt.slice(0, 10)} - {userMessage.message}
										</div>
									))}
								</div>
							) : (
								<div className="text-center">
									<p>No Messages Available</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
