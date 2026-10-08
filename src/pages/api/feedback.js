import dbConnect from "../../../backend/dbconnect.js";
import FeedbackModel from "../../../backend/models/FeedbackModel.js";

export default async function handler(req, res) {
    await dbConnect();

    const { feedback, firstName } = req.body;
    try {
        await FeedbackModel.create({ feedback, firstName });
        res.status(200).json({ success: true });
    } catch {
        res.status(500).json({ success: false, error: "Error saving feedback" });
    }
}