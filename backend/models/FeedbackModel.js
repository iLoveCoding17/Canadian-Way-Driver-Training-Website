import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
});

const FeedbackModel = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
export default FeedbackModel;