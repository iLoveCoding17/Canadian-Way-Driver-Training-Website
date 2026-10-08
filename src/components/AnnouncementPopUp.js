import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Modal } from "@mui/material";
import Button from "@/components/Button";

export default function AnnouncementPopUp() {
	const [announcement, setAnnouncement] = useState(null);

	/*https://www.youtube.com/watch?v=SRgwGTLrFiU&t=72s (Helped me implement the popup)*/
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		const timer = setTimeout(() => {
			setOpen(true);
		}, 1000);

		return () => clearTimeout(timer);
	};

	const handleClose = () => setOpen(false);
	useEffect(() => {
		const fetchAnnouncement = async () => {
			try {
				const response = await axios.post("/api/fetchAnnouncements");
				setAnnouncement(response.data.announcement.announcement);
			} catch (error) {
				console.error("Fetching announcement failed", error);
			}
		};

		fetchAnnouncement();
		handleOpen();
	}, []);

	return (
		<Modal open={open} onClose={handleClose}>
			<div className="d-flex justify-content-center" style={{ outline: "none" }}>
				<div className="col-lg-4 bg-white shadow rounded-4 mt-5 py-3 px-1 text-center">
					<h4>Announcement</h4>
					<h6 className="py-2">{announcement}</h6>
					<Button click={handleClose}>Close</Button>
				</div>
			</div>
		</Modal>
	);
}
