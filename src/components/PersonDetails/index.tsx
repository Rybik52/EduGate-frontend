"use client";

import { useEffect, useState } from "react";
import { Person } from "@/components/Search/types";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Loader } from "./Loader";
interface PersonDetailsProps {
	id: string;
}

export function PersonDetails({ id }: PersonDetailsProps) {
	const [person, setPerson] = useState<Person | null>(null);
	const [isLoading, setIsLoading] = useState(true);

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
							Заблокировать
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
							<label className="block mb-2">Роли</label>
							<Input
								disabled
								type="text"
								placeholder="Роли"
								value={person.persone_roles
									.map((role) => role.name)
									.join(", ")}
							/>
						</div>
					)}

					{person.positions.length !== 0 && (
						<div>
							<label className="block mb-2">Должность</label>
							<Input
								disabled
								type="text"
								placeholder="Роли"
								value={person.positions
									.map((position) => position.name)
									.join(", ")}
							/>
						</div>
					)}

					<div>
						<label className="block mb-2">Площадки</label>
						<Input
							disabled
							type="text"
							placeholder="Площадки"
							value={person.locations
								.map((location) => location.name)
								.join(", ")}
						/>
					</div>

					<div>
						<label className="block mb-2">Департаменты</label>
						<Input
							disabled
							type="text"
							placeholder="Площадки"
							value={person.departaments
								.map((departament) => departament.name)
								.join(", ")}
						/>
					</div>

					{person.students_groups.length !== 0 && (
						<div>
							<label className="block mb-2">Учебные группы</label>
							<Input
								disabled
								type="text"
								placeholder="Учебные группы"
								value={person.students_groups
									.map((group) => group.name)
									.join(", ")}
							/>
						</div>
					)}
				</div>
			</div>

			<div className="w-1/2">
				<Calendar className="w-full h-full bg-white rounded-2xl" />
			</div>
		</div>
	);
}
