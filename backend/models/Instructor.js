import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
	fname: {
		type: String,
		required: true,
	},
	lname: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
});

const Instructor = mongoose.models.Instructor || mongoose.model("Instructor", instructorSchema);
export default Instructor;
