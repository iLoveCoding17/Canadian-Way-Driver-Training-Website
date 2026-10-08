/**
 * @file Admin.js
 * @description Admin.js is the admin page and is mostly used for handling admin related opeartions.
 * 
 * This file includes operations for:
 * - Managing users bookings.
 * - Creating annoucements to send to all users.
 * - Sending users messages.
 * - Managing users information.
 * - Deleting users. 
 */

import Layout from "@/components/Layout";
import { Col, Row, Stack } from "react-bootstrap";
import { Paper } from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import Link from "next/link";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "first", headerName: "First", width: 150 },
  { field: "last", headerName: "Last", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
  {
    field: "paymentStatus",
    headerName: "Payment Status",
    width: 150,
    renderCell: (params) => {
      const handleChange = async (event) => {
        const newValue = event.target.value;
        params.api.updateRows([{ id: params.id, paymentStatus: newValue }]);

        try {
          const response = await fetch("/api/users", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: params.row.email,
              paymentStatus: newValue.toLowerCase(),
            }),
          });

          const result = await response.json();
          if (!response.ok) {
            console.error("Failed to update status:", result.error);
            alert("Failed to update payment status.");
            params.api.updateRows([{ id: params.id, paymentStatus: params.value }]);
          }
        } catch (err) {
          console.error("Fetch error:", err);
          alert("Failed to update payment status.");
          params.api.updateRows([{ id: params.id, paymentStatus: params.value }]);
        }
      };

      return (
        <select value={params.value || "unpaid"} onChange={handleChange}>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      );
    },
    editable: false,
  },{ field: "masterNumber", headerName: "Master Number", width: 150 },
];

export default function Admin() {
  const [rows, setRows] = useState([]);
  const [currentUser, setUser] = useState("No User Selected");
  const [currentEmail, setEmail] = useState("No User Selected");
  const [currentPaymentStatus, setPaymentStatus] = useState("Unpaid");
  const [announcement, setAnnouncement] = useState("");
  const [nextBookingDate, setNextBookingDate] = useState(null);
  const apiRef = useGridApiRef();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      const data = res.data;
      const formatData = data.map((user, index) => ({
        id: index,
        first: user.firstName,
        last: user.lastName,
        email: user.email,
        paymentStatus: user.Paymentstatus || "unpaid",
        masterNumber: user.masterNumber
      }));
      setRows(formatData);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const selectUser = async (selectionModel) => {
    if (!selectionModel.length) {
      setUser("No User Selected");
      setEmail("No User Selected");
      setPaymentStatus("Unpaid");
      setNextBookingDate(null);
      return;
    }

    const selected = rows.find((row) => row.id === selectionModel[0]);
    if (selected) {
      setUser(`${selected.first} ${selected.last}`);
      setEmail(selected.email);
      setPaymentStatus(
        selected.paymentStatus.charAt(0).toUpperCase() + selected.paymentStatus.slice(1)
      );

      try {
        const res = await axios.get(
          `/api/bookingAPI?email=${encodeURIComponent(selected.email)}`
        );

        if (res.data.success && res.data.booking) {
          setNextBookingDate(new Date(res.data.booking.date));
        } else {
          setNextBookingDate(null);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNextBookingDate(null);
        } else {
          console.error("Failed to fetch booking:", error);
          alert("Unexpected error fetching booking data.");
          setNextBookingDate(null);
        }
      }
    }
  };

  async function handleAnnouncementSubmit(event) {
    event.preventDefault();
    if (!announcement.trim()) {
      alert("Please enter an announcement");
      return;
    }

    try {
      const response = await axios.post("/api/announcements", { announcement });
      if (response.data.success) {
        alert("Announcement submitted successfully");
        setAnnouncement("");
      } else {
        alert("Failed to submit announcement");
      }
    } catch (error) {
      alert("Error submitting announcement");
    }
  }

  return (
    <Layout>
      <div className="p-4">
        <Row>
          <h1 className="mx-4 mt-5">Bookings</h1>
        </Row>

        <Row className="mt-3 flex-column flex-lg-row">
          <Col lg={6} className="mb-4">
            <div className="shadow p-3 bg-white rounded-5 h-100">
              <Paper sx={{ height: 400, width: "100%" }} className="mt-4">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  checkboxSelection
                  apiRef={apiRef}
                  disableMultipleRowSelection
                  onRowSelectionModelChange={selectUser}
                />
              </Paper>
              <div className="p-3 d-flex flex-wrap gap-3">
                <Button>Delete</Button>
                <Button click={() => window.location.reload()}>Save</Button>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="shadow p-3 bg-white rounded-5 h-100">
              <Stack direction="vertical">
                <div className="p-3">
                  <h4 className="mt-3 lead">User View</h4>
                  <h1 className="text-break">{currentUser}</h1>
                </div>

                <Stack direction="horizontal" className="flex-wrap gap-3 px-3">
                  <div
                    className="shadow bg-white rounded-5 text-center p-3 flex-grow-1"
                    style={{ minWidth: "250px", maxWidth: "100%" }}
                  >
                    <h6 className="mt-2">Next Booking</h6>
                    {nextBookingDate ? (
                      <>
                        <h1>{nextBookingDate.toLocaleString("default", { month: "short" })}</h1>
                        <h3>{nextBookingDate.getDate()}</h3>
                      </>
                    ) : (
                      <h5 className="my-5">No upcoming booking</h5>
                    )}
                    <Button>Manage Booking</Button>
                    <Link href={`/messagePage?email=${currentEmail}`}>
                      <Button id="message_button">Send Message</Button>
                    </Link>
                  </div>

                  <Stack direction="vertical" className="gap-3 flex-grow-1">
                    <div>
                      <h5>Payment</h5>
                      <div className="shadow bg-white rounded-5 text-center p-2">
                        {currentPaymentStatus}
                      </div>
                    </div>

                    <div>
                      <h5>Email</h5>
                      <div className="shadow bg-white rounded-5 text-center p-2 text-break">
                        {currentEmail}
                      </div>
                    </div>

                    <div>
                      <h5>Phone Number</h5>
                      <div className="shadow bg-white rounded-5 text-center p-2">
                        647-935-2932
                      </div>
                    </div>
                  </Stack>
                </Stack>
              </Stack>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <div
              className="container shadow p-4 bg-white rounded-5 mb-5"
              style={{ maxWidth: "770px" }}
            >
              <h3>Send Announcement</h3>
              <form onSubmit={handleAnnouncementSubmit}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="5"
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    placeholder="Enter your announcement here..."
                  />
                </div>
                <Button type="submit">Send Announcement</Button>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}
