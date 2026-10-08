import mongoose from "mongoose";

//Schema for emaail scheduling 
const emailSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  message: { type: String, required: true },
  email: { type: String, required: true },
  sendDate: { type: Date, required: true },
  sent: { type: Boolean, required: true },
});

const emailSchedModel = mongoose.models.Email || mongoose.model("Email", emailSchema);

export default emailSchedModel;
