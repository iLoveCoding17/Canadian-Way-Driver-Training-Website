/**
 * @file TestimonialPage.js
 * @description TestimonialPage.js is a component for the testimonials page which displays feedback from students.
 */

import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Testimonials() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        async function fetchFeedbacks() {
            const res = await axios.get("/api/getFeedbacks");
            if (res.data.success) {
                setFeedbacks(res.data.feedbacks);
            }
        }
        fetchFeedbacks();
    }, []);

    return (
        <>
            <Layout>
                <Stack gap={2} className="col-md-5 mx-auto mt-5">
                    <h1 className="p-2 text-center fw-bold">Testimonials</h1>
                    <p className="lead text-center">
                        Still need a reason to sign up? Read reviews from some of our customers!
                    </p>
                </Stack>

              <div className="container mt-5">
                <div className="row justify-content-center g-5">
                  {/* Testimonial 1 */}
                  <div className="col-12 col-md-4 d-flex flex-column align-items-center text-center">
                    <Card.Img
                      src="/img/guysitting.jpg"
                      className="rounded-pill object-fit-cover mb-3"
                      style={{ height: "400px", width: "252px" }}
                    />
                    <h1 className="fw-semibold">Indy Calina</h1>
                    <p className="lead fw-lighter fst-italic">&quot;INCH Events&quot;</p>
                    <div className="bg-red rounded-pill text-white py-3 px-4 fw-light">
                      Abdul from Canadian Way Driver<br />
                      came highly recommended!
                    </div>
                  </div>

                  {/* Testimonial 2 */}
                  <div className="col-12 col-md-4 d-flex flex-column align-items-center text-center">
                    <Card.Img
                      src="/img/snowycar.jpg"
                      className="rounded-pill object-fit-cover mb-3"
                      style={{ height: "400px", width: "252px" }}
                    />
                    
                    <h1 className="fw-semibold mt-1">Omutayu Kalejaiye</h1>
                    <p className="lead fw-lighter fst-italic">Student</p>
                    <div className="bg-red rounded-pill text-white px-3 py-4 fw-light mb-2">
                      Abdul’s training was clear & of high quality
                    </div>

                  </div>

                  {/* Testimonial 3 */}
                  <div className="col-12 col-md-4 d-flex flex-column align-items-center text-center">
                    <Card.Img
                      src="/img/moose.jpg"
                      className="rounded-pill object-fit-cover mb-3"
                      style={{ height: "400px", width: "252px" }}
                    />
                    <h1 className="fw-semibold">Leslie Lowe</h1>
                    <p className="lead fw-lighter fst-italic">Chronicle Herald</p>
                    <div className="bg-red rounded-pill text-white py-3 px-4 fw-light">
                      Steel-nerved Abawayj is the grandaddy of<br />
                      Halifax’s newcomer driving scene!
                    </div>
                  </div>
                </div>
              </div>


                {/* Feedbacks from DB */}
                <div className="container mt-5 mb-5">
                    <h2 className="text-center mb-4">Recent Student Feedback</h2>
                    <div className="row">
                        {feedbacks.map((fb, idx) => (
                            <div className="col-md-6 mb-4" key={fb._id || idx}>
                                <div className="card shadow rounded-4 p-3 h-100">
                                    <div className="card-body">
                                        <p className="card-text fst-italic">&quot;{fb.feedback}&quot;</p>
                                        <hr />
                                        <p className="mb-0 fw-bold">{fb.firstName || "Anonymous"}</p>
                                        <p className="mb-0 text-muted">Student</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
}