import dbConnect from "../../../backend/dbconnect.js";
import newcalendar from "../../../backend/models/newcalendar.js";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const booking = await newcalendar.create(req.body);
      return res.status(201).json({ success: true, booking });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else if (req.method === "DELETE") {
    const { user } = req.body;
    try {
      const deleted = await newcalendar.deleteOne({ user });
      return res.status(201).json({ success: true, deleted });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else if (req.method === "GET") {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    try {
      const now = new Date();
      const booking = await newcalendar.findOne({
        user: email,
        date: { $gte: now },
      }).sort({ date: 1 });

      if (!booking) {
        return res.status(404).json({ success: false, message: "No upcoming booking found" });
      }

      return res.status(200).json({ success: true, booking });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
