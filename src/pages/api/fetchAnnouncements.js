import dbConnect from "../../../backend/dbconnect.js";
import AnnouncementModel from "../../../backend/models/AnnouncementModel.js";

export default async function handler(req, res) {
	await dbConnect();

	try {
		let announcement;
		announcement = await AnnouncementModel.findOne().sort({ createdAt: -1 });
		res.status(200).json({ success: true, announcement: announcement });
	} catch {
		res.status(500).json({ success: false, error: "Error fetching announcement" });
	}
}
