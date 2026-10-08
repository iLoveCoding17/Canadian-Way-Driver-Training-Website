import dbConnect from "../../../backend/dbconnect.js";
import emailSchedModel from "../../../backend/models/emailSchedModel.js";

export default async function handler(req, res) {
  await dbConnect();
    //If the user POSTS, then create a an object in the mongoDB
    if (req.method === "POST") {
    try {
        const email = await emailSchedModel.create(req.body);
            return res.status(200).json({ success: true, email });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    } 
}