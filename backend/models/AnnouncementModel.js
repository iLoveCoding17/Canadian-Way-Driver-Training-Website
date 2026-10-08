import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
	{
		announcement: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const AnnouncementModel = mongoose.models.Announcement || mongoose.model("Announcement", announcementSchema);
export default AnnouncementModel;
