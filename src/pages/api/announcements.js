import dbConnect from "../../../backend/dbconnect.js";
import AnnouncementModel from "../../../backend/models/AnnouncementModel.js";

export default async function handler(req, res) {
	await dbConnect();

	const announcement = req.body.announcement;
	try {
		await AnnouncementModel.create({ announcement });
		res.status(200).json({ success: true });
	} catch {
		res.status(500).json({ success: false, error: "Error saving announcement to database" });
	}
}
