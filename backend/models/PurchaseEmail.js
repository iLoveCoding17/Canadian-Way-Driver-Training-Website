import mongoose from "mongoose";

const PurchaseEmailSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		course: { type: String, required: true },
		paymentStatus: {
			type: String,
			default: "Completed",
		},
	},
	{ timestamps: true },
);

// Check if the model already exists in mongoose.models, otherwise, create it
const PurchaseEmail = mongoose.models.PurchaseEmail || mongoose.model("PurchaseEmail", PurchaseEmailSchema);

export default PurchaseEmail;
