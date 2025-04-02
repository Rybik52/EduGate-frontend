import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

export const Loader = () => {
	return (
		<div className="flex justify-between">
			<div className="flex flex-col w-[40%] gap-10">
				<div className="flex gap-4">
					<div className="rounded-sm bg-[#CDEFD7] w-5 "></div>
					<h3 className="text-4xl font-medium">Личная информация</h3>
				</div>

				<div className="flex gap-8 items-center">
					<Skeleton className="w-40 h-40 bg-gray-300 rounded-full" />

					<div className="flex gap-4">
						<Button
							disabled
							className="bg-[#448EFD] rounded-3xl text-white hover:opacity-70"
						>
							+ Редактировать
						</Button>
						<Button
							disabled
							className="bg-[#FFD9DB] rounded-3xl text-[#FB444B] hover:opacity-70 hover:text-white"
						>
							Заблокировать
						</Button>
					</div>
				</div>

				<div className="flex justify-between">
					<div className="w-fit">
						<label htmlFor="fullname">ФИО</label>
						<Skeleton className="w-40 h-10 bg-gray-300" />
					</div>
					<div>
						<label htmlFor="email">Email</label>
						<Skeleton className="w-40 h-10 bg-gray-300" />
					</div>
				</div>

				<div className="flex gap-4">
					<div className="rounded-sm bg-[#FFE7CA] w-5 "></div>
					<h3 className="text-4xl font-medium">Рабочая информация</h3>
				</div>

				<div className="flex flex-wrap gap-6">
					<div>
						<label className="block mb-2">Роли</label>
						<Skeleton className="w-40 h-10 bg-gray-300" />
					</div>
					<div>
						<label className="block mb-2">Должность</label>
						<Skeleton className="w-40 h-10 bg-gray-300" />
					</div>
					<div>
						<label className="block mb-2">Площадки</label>
						<Skeleton className="w-40 h-10 bg-gray-300" />
					</div>
					<div>
						<label className="block mb-2">Департаменты</label>
						<Skeleton className="w-40 h-10 bg-gray-300" />
					</div>
					<div>
						<label className="block mb-2">Учебные группы</label>
						<Skeleton className="w-40 h-10 bg-gray-300" />
					</div>
				</div>
			</div>

			<div className="w-1/2">
				<Skeleton className="w-full h-full bg-gray-300 rounded-2xl" />
			</div>
		</div>
	);
};
