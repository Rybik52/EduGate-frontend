"use client";

import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Loader } from "./Loader";
import { Badge } from "../ui/badge";
import { AttendanceModal } from "./AttendanceModal";
import { usePersonDetails } from "./usePersonDetails";

interface PersonDetailsProps {
	id: string;
}

export function PersonDetails({ id }: PersonDetailsProps) {
	const {
		person,
		isLoading,
		attendance,
		selectedAttendance,
		isModalOpen,
		handleDayClick,
		handleModalClose,
	} = usePersonDetails(id);

	if (isLoading) {
		return <Loader />;
	}

	if (!person) {
		return <h1>Персона не найдена =(</h1>;
	}

	const fullName = `${person.surname} ${person.firstName} ${
		person?.lastName ?? ""
	}`;

	return (
		<div className="flex justify-between">
			<div className="flex flex-col w-[40%] gap-10">
				<div className="flex gap-4">
					<div className="rounded-sm bg-[#CDEFD7] w-5 "></div>
					<h3 className="text-4xl font-medium">Личная информация</h3>
				</div>

				<div className="flex gap-8 items-center">
					<Avatar className="w-40 h-40 ">
						{person?.avatar && (
							<AvatarImage
								className="aspect-square"
								src={`http://localhost:1337${person.avatar?.url}`}
							/>
						)}
						<AvatarFallback className="bg-gray-300">
							<Skeleton className="w-40 h-40" />
						</AvatarFallback>
					</Avatar>

					<div className="flex gap-4">
						<Button className="bg-[#448EFD] rounded-3xl text-white hover:opacity-70">
							+ Редактировать
						</Button>
						<Button className="bg-[#FFD9DB] rounded-3xl text-[#FB444B] hover:opacity-70 hover:text-white">
							{person.blocked
								? "Разблокировать"
								: "Заблокировать"}
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label htmlFor="fullname">ФИО</label>
						<Input
							disabled
							id="fullname"
							type="text"
							placeholder="ФИО"
							value={fullName}
						/>
					</div>
					<div>
						<label htmlFor="email">Email</label>
						<Input
							disabled
							id="email"
							type="email"
							placeholder="Email"
							value={person.email}
						/>
					</div>
				</div>

				<div className="flex gap-4">
					<div className="rounded-sm bg-[#FFE7CA] w-5 "></div>
					<h3 className="text-4xl font-medium">Рабочая информация</h3>
				</div>

				<div className="grid grid-cols-3 gap-6">
					{person.persone_roles.length !== 0 && (
						<div>
							<p className="block mb-2">Роли</p>
							<div className="flex gap-1 flex-wrap">
								{person.persone_roles.map((role) => (
									<Badge key={role.id}>{role.name}</Badge>
								))}
							</div>
						</div>
					)}

					{person.positions.length !== 0 && (
						<div className="flex flex-col flex-wrap">
							<p className="block mb-2">Должность</p>
							<div className="flex gap-1 flex-wrap">
								{person.positions.map((position) => (
									<Badge key={position.id}>
										{position.name}
									</Badge>
								))}
							</div>
						</div>
					)}

					{person.locations.length !== 0 && (
						<div className="flex flex-col flex-wrap">
							<p className="block mb-2">Площадки</p>
							<div className="flex gap-1 flex-wrap">
								{person.locations.map((location) => (
									<Badge key={location.id}>
										{location.name}
									</Badge>
								))}
							</div>
						</div>
					)}

					{person.departaments.length !== 0 && (
						<div className="flex flex-col flex-wrap">
							<p className="block mb-2">Департаменты</p>
							<div className="flex gap-1 flex-wrap">
								{person.departaments.map((departament) => (
									<Badge key={departament.id}>
										{departament.name}
									</Badge>
								))}
							</div>
						</div>
					)}

					{person.students_groups.length !== 0 && (
						<div className="flex flex-col flex-wrap">
							<p className="block mb-2">Учебные группы</p>

							<div className="flex gap-1 flex-wrap">
								{person.students_groups.map((group) => (
									<Badge key={group.id}>{group.name}</Badge>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="w-1/2">
				<Calendar
					mode="multiple"
					selected={
						attendance?.map((record) => new Date(record.date)) || []
					}
					onDayClick={handleDayClick}
					className="w-full h-full bg-white rounded-2xl"
					modifiers={{
						attended:
							attendance?.map(
								(record) => new Date(record.date)
							) || [],
					}}
					modifiersStyles={{
						attended: {
							backgroundColor: "#CDEFD7",
							color: "#000",
						},
					}}
					disabled={[]}
				/>
			</div>
			<AttendanceModal
				isOpen={isModalOpen}
				onClose={handleModalClose}
				attendance={selectedAttendance}
			/>
		</div>
	);
}
