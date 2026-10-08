import mongoose from "mongoose";

const purchaseCourseSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		masterNumber: {
			type: String,
			required: true,
		},
		courseName: {
			type: String,
			required: true,
		},
		coursePrice: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const PurchaseCourseModel = mongoose.models.PurchaseCourse || mongoose.model("PurchaseCourse", purchaseCourseSchema);
export default PurchaseCourseModel;
