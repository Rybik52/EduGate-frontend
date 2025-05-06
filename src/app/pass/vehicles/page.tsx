import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { VehicleItem } from "./components/VehicleItem";
import { Vehicle } from "./types";

const MOCK_VEHICLES: Vehicle[] = [
	{
		id: 1,
		plateNumber: "А123БВ777",
		validFrom: new Date().toISOString(),
		validUntil: new Date(
			new Date().setMonth(new Date().getMonth() + 3)
		).toISOString(),
		location: "Главный корпус",
		owner: {
			id: 1,
			name: "Иванов Иван Иванович",
		},
		status: "active",
	},
	{
		id: 2,
		plateNumber: "В321ГД777",
		validFrom: new Date().toISOString(),
		validUntil: new Date(
			new Date().setMonth(new Date().getMonth() + 1)
		).toISOString(),
		location: "Парковка А",
		owner: {
			id: 2,
			name: "Петров Петр Петрович",
		},
		status: "pending",
	},
];

export default function page() {
	return (
		<div className="max-h-[70vh] h-[70vh]">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Главная</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/pass">
							Пропускная система
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Транспорт</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="flex justify-end mt-2">
				<Button className="bg-[#448EFD] rounded-2xl">
					+ Добавить транспорт
				</Button>
			</div>

			<div className="flex justify-between mt-5 h-[90%]">
				<div className="flex flex-col gap-8 w-full">
					<div className="flex flex-col mt-5 w-full">
						<div className="flex justify-between w-full">
							<h3 className="font-bold text-3xl">
								Зарегистрированный транспорт
							</h3>
							<div className="w-1/4">
								<Input
									className="flex items-center justify-center rounded-xl"
									type="search"
									placeholder="Поиск по номеру"
									suffixIcon={<SearchIcon />}
								/>
							</div>
						</div>
					</div>

					<div className="w-full h-screen flex-1 overflow-y-auto bg-white rounded-2xl p-6">
						<div className="flex flex-col gap-2">
							{MOCK_VEHICLES.map((vehicle) => (
								<VehicleItem
									key={vehicle.id}
									vehicle={vehicle}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
