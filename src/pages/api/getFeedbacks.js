import dbConnect from "../../../backend/dbconnect.js";
import FeedbackModel from "../../../backend/models/FeedbackModel.js";

export default async function handler(req, res) {
    await dbConnect();

    try {
        const feedbacks = await FeedbackModel.find({})
            .sort({ _id: -1 })
            .limit(6)
            .lean();
        res.status(200).json({ success: true, feedbacks });
    } catch {
        res.status(500).json({ success: false, error: "Error fetching feedbacks" });
    }
}