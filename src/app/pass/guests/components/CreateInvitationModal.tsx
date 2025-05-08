import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { ru } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { useState, useEffect } from "react";
import { CreateInvitationModalProps } from "../types";

export const CreateInvitationModal = ({
	isOpen,
	onOpenChange,
	formData,
	setFormData,
	handleCreateInvitation,
}: CreateInvitationModalProps) => {
	// Создаем состояние для диапазона дат
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: formData.validFrom,
		to: formData.validTo,
	});

	// Обновляем диапазон дат при изменении formData
	useEffect(() => {
		if (isOpen) {
			setDateRange({
				from: formData.validFrom,
				to: formData.validTo,
			});
		}
	}, [isOpen, formData.validFrom, formData.validTo]);

	// Обновляем formData при изменении диапазона дат
	useEffect(() => {
		if (dateRange?.from) {
			setFormData({
				...formData,
				validFrom: dateRange.from,
				validTo: dateRange.to || dateRange.from,
			});
		}
	}, [dateRange]);

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[525px]">
				<DialogHeader>
					<DialogTitle>Создать новое приглашение</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="flex items-center gap-4">
						<label htmlFor="surname">Фамилия*</label>
						<Input
							id="surname"
							value={formData.surname}
							onChange={(e) =>
								setFormData({
									...formData,
									surname: e.target.value,
								})
							}
							required
						/>
					</div>
					<div className="flex items-center gap-4">
						<label htmlFor="firstName" className="text-right">
							Имя*
						</label>
						<Input
							id="firstName"
							value={formData.firstName}
							onChange={(e) =>
								setFormData({
									...formData,
									firstName: e.target.value,
								})
							}
							required
						/>
					</div>
					<div className="flex items-center gap-4">
						<label htmlFor="lastName" className="text-right">
							Отчество
						</label>
						<Input
							id="lastName"
							value={formData.lastName}
							onChange={(e) =>
								setFormData({
									...formData,
									lastName: e.target.value,
								})
							}
						/>
					</div>
					<div className="flex items-center gap-4">
						<label htmlFor="email" className="text-right">
							Email*
						</label>
						<Input
							id="email"
							type="email"
							value={formData.email}
							onChange={(e) =>
								setFormData({
									...formData,
									email: e.target.value,
								})
							}
							required
						/>
					</div>

					<div className="flex flex-col gap-4">
						<label>Период действия*</label>
						<div className="">
							<Calendar
								mode="range"
								selected={dateRange}
								onSelect={setDateRange}
								disabled={(date) => date < new Date()}
								locale={ru}
								className="rounded-md border"
							/>
							<div className="mt-2 text-sm text-gray-500">
								{dateRange?.from ? (
									dateRange.to ? (
										<span>
											Выбран период:{" "}
											{dateRange.from.toLocaleDateString(
												"ru-RU"
											)}{" "}
											-{" "}
											{dateRange.to.toLocaleDateString(
												"ru-RU"
											)}
										</span>
									) : (
										<span>
											Выбрана дата начала:{" "}
											{dateRange.from.toLocaleDateString(
												"ru-RU"
											)}
										</span>
									)
								) : (
									<span>
										Выберите период действия приглашения
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
					>
						Отмена
					</Button>
					<Button type="button" onClick={handleCreateInvitation}>
						Создать
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
