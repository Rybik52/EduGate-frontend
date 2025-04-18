import { useState, useEffect } from "react";
import { Person } from "@/components/Search/types";
import { AttendanceRecord } from "./types";

export function usePersonDetails(id: string) {
	const [person, setPerson] = useState<Person | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

	const [selectedAttendance, setSelectedAttendance] =
		useState<AttendanceRecord | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const fetchAttendance = async () => {
			try {
				const response = await fetch(
					`http://localhost:1337/api/visitors/${id}/attendance-history`
				);
				const data = await response.json();
				setAttendance(data);
			} catch (error) {
				console.error("Failed to fetch attendance:", error);
				setAttendance([]);
			}
		};

		fetchAttendance();
	}, [id]);

	useEffect(() => {
		const fetchPerson = async () => {
			try {
				const response = await fetch(
					`http://localhost:1337/api/visitors/${id}/detailed`
				);
				const data = await response.json();
				setPerson(data);
			} catch (error) {
				console.error("Failed to fetch person:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPerson();
	}, [id]);

	const handleDayClick = (date: Date) => {
		const attendanceRecord = attendance?.find(
			(record) =>
				new Date(record.date).toDateString() === date.toDateString()
		);

		if (attendanceRecord) {
			setSelectedAttendance(attendanceRecord);
			setIsModalOpen(true);
		}
	};

	const handleModalClose = () => setIsModalOpen(false);

	return {
		person,
		isLoading,
		attendance,
		selectedAttendance,
		isModalOpen,
		handleDayClick,
		handleModalClose,
	};
}
