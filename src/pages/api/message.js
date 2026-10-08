import dbConnect from "../../../backend/dbconnect.js";
import messageModel from "../../../backend/models/messageModel.js";
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
	await dbConnect();

	const subject = req.body.subject;
	const message = req.body.message;
	const email = req.body.email;
	try {
		await messageModel.create({ subject, message, email });

		/*https://www.youtube.com/watch?v=esdFVfFA_nI&t=174s (Tutorial helped me learn about node mailer)*/
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		let info = await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: subject,
			text: message,
		});

		res.status(200).json({ success: true });
	} catch {
		res.status(500).json({ success: false, error: "Error saving message" });
	}
}
