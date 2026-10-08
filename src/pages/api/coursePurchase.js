import dbConnect from "../../../backend/dbconnect.js";
import PurchaseCourseModel from "../../../backend/models/PurchaseCourseModel.js";
import User from "../../../backend/models/User.js";
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
	await dbConnect();

	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const phone = req.body.phone;
	const paymentMethod = req.body.paymentMethod;
	const courseName = req.body.courseName;
	const coursePrice = req.body.coursePrice;
	const masterNumber = req.body.masterNumber;
	try {
		const user = await User.findOne({ email });
		if(user === null) {
			return res.status(400).json({ success: false, message: "Email is not registered" });
		}
		await PurchaseCourseModel.create({ firstName, lastName, email, phone, paymentMethod, courseName, coursePrice, masterNumber});
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		let sendInfoToCustomer = await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: `${courseName} Purchase Details`,
			text: `Dear ${firstName} ${lastName}, \n\nThank you for purchasing "${courseName}" course.\nPlease be advised that you need to pay the required amount to confirm your purchase.\n\nBest Regards,\n\nCanadian Way Driver Training`,
		});

		let sendInfoToCompany = await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: process.env.EMAIL_USER,
			subject: `Course Purchase Details`,
			text: `Customer ${firstName} ${lastName} has purchased "${courseName}" course.\n\nThe customer has selected to pay by ${paymentMethod}.\n\n Customer Email: ${email}.\n\n Customer Phone Number: ${phone}`,
		});
		res.status(200).json({ success: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Error saving purchase information" });
	}
}
