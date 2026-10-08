import dbConnect from "../../../backend/dbconnect.js";
import messageModel from "../../../backend/models/messageModel.js";

export default async function handler(req, res) {
	await dbConnect();

	const email = req.body.email;
	try {
		let messages;
		messages = await messageModel.find({ email });
		res.status(200).json({ success: true, messages: messages });
	} catch {
		res.status(500).json({ success: false, error: "Error fetching messages" });
	}
}
