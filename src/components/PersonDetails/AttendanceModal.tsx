import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { AttendanceModalProps } from "./types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export function AttendanceModal({
	isOpen,
	onClose,
	attendance,
}: AttendanceModalProps) {
	if (!attendance) return null;

	const formatTime = (timeString: string) => {
		try {
			const date = parseISO(timeString);
			return format(date, "HH:mm");
		} catch (error) {
			return timeString;
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-white p-6 min-w-[400px]">
				<DialogHeader>
					<DialogTitle className="text-xl mb-4">
						Детализация посещений за{" "}
						{format(new Date(attendance.date), "d MMMM yyyy", {
							locale: ru,
						})}
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					{attendance.entries.map((record, index) => (
						<div
							key={index}
							className="flex justify-between items-center p-2 bg-gray-50 rounded"
						>
							<div className="text-green-600">
								Вход: {formatTime(record.entry)}
							</div>
							<div className="text-red-600">
								{record.exit
									? `Выход: ${formatTime(record.exit)}`
									: "Не вышел"}
							</div>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
