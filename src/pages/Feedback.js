/**
 * @file FeedBack.js
 * @description FeedBack.js is the page in which the user can submit feedback to the admins/canadianWayDrivers.
 * 
 * This file includes operations for:
 * - Utilizes the feedback.js to post the feedback on the database.
 * - The feedback page UI.
 */
import Layout from "@/components/Layout";
import React, { useState } from "react";
import Button from "@/components/Button";
import axios from "axios";

export default function Feedback() {
    const [feedback, setFeedback] = useState("");
    const [firstName, setFirstName] = useState("");

    //Function to send the feedback 
    async function formSubmit(event) {
        event.preventDefault();

        //Letting the user know if their feedback has been sent successfully.
        const response = await axios.post("/api/feedback", { feedback, firstName });
        if (response.data.success) {
            window.alert("Your feedback has been submitted successfuly");
            setFeedback("");
            setFirstName("");
        } else {
            console.error("Failed to submit feedback ", response.data.error);
            window.alert("Failed to submit your feedback");
        }
    }
    return (
        <Layout>
            <div className="container col-lg-9 bg-white shadow rounded-4 mt-5 p-4">
                <form onSubmit={formSubmit}>
                    <div>
                        <h4 className="text-center mb-3">Please add your feedback</h4>
                        <input
                            className="form-control mb-2"
                            type="text"
                            placeholder="First Name"
                            required
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                        <textarea
                            className="form-control mb-2"
                            rows="6"
                            placeholder="Message"
                            required
                            value={feedback}
                            onChange={(event) => setFeedback(event.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button type="submit">Submit Feedback</Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}