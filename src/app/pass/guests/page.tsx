import { VisitorItem } from "@/app/persons/components/VisitorItem";
import { InvitedVisitor, Visitor } from "@/app/persons/types";
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

const MOKE: InvitedVisitor[] = [
	{
		id: 1,
		fullName: "Иванов Иван Иванович",
		email: "test@gmail.com",
		status: "present",
		lastEntry: new Date().toISOString(),
		lastExit: null,
		blocked: false,
		positions: [],
		roles: ["Гость"],
		group: null,
		invitedBy: "Иванов Иван Иванович",
		crateDate: new Date().toISOString(),
		invitedAt: new Date().toISOString(),
		invitedUntil: new Date().toISOString(),
	},
];

const MOKE_INVITED: InvitedVisitor[] = [
	{
		id: 2,
		fullName: "Иванов Иван Иванович",
		email: "test@gmail.com",
		status: "present",
		lastEntry: new Date().toISOString(),
		lastExit: null,
		blocked: false,
		positions: [],
		roles: ["Гость"],
		group: null,
		invitedBy: "Иванов Иван Иванович",
		crateDate: new Date().toISOString(),
		invitedAt: new Date().toISOString(),
		invitedUntil: new Date().toISOString(),
		invitedStatus: "Одобрено",
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
						<BreadcrumbPage>Гости</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="flex justify-end mt-2">
				<Button className="bg-[#448EFD] rounded-2xl">
					+ Новое приглашение
				</Button>
			</div>

			<div className="flex justify-between mt-5 h-[90%]">
				<div className="flex flex-col gap-8 w-2/3">
					<div className="flex flex-col mt-5 w-full">
						<div className="flex justify-between w-full">
							<h3 className="font-bold text-3xl">
								Все приглашения
							</h3>
							<div className="w-1/4">
								<Input
									className="flex items-center justify-center rounded-xl"
									type="search"
									placeholder="Поиск приглашений"
									suffixIcon={<SearchIcon />}
								/>
							</div>
						</div>
					</div>

					<div className="w-full h-screen flex-1 overflow-y-auto bg-white rounded-2xl p-6">
						<ul className="list-none flex flex-col gap-4">
							{MOKE?.map((visitor) => (
								<VisitorItem
									key={visitor.id}
									visitor={visitor}
									hasInvited
								/>
							))}
						</ul>
					</div>
				</div>

				<div className="flex flex-col w-[30%] bg-white rounded-2xl p-6">
					<div className="flex justify-between items-center">
						<p className="font-bold text-lg">
							Созданные приглашения
						</p>

						<div className="flex gap-2 items-center">
							<p className="font-bold text-gray-400">Статус</p>
							<div className="flex gap-1 items-center">
								<div className="rounded w-5 h-5 bg-yellow-200" />
								<div className="rounded w-5 h-5 bg-green-200" />
							</div>
						</div>
					</div>

					<ul className="list-none">
						{MOKE_INVITED.map((invitedVisitor) => (
							<VisitorItem
								key={invitedVisitor.id}
								visitor={invitedVisitor}
								hasInviteRequest
							/>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
