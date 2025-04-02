import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { Person } from "./types";
import { Skeleton } from "../ui/skeleton";

interface PersonTableProps {
	persons: Person[];
	isLoading: boolean;
}

export function PersonTable({ persons, isLoading }: PersonTableProps) {
	return (
		<div className="h-[60vh]">
			<Table>
				<TableHeader className="sticky top-0 bg-gray-200">
					<TableRow>
						<TableHead className="w-[100px]">Группы</TableHead>
						<TableHead>ФИО</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Последнее действие</TableHead>
						<TableHead>Статус</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isLoading ? (
						<TableRow>
							<TableCell colSpan={5} className="text-center">
								<Skeleton className="w-full h-full bg-gray-300" />
							</TableCell>
						</TableRow>
					) : (
						persons.map((person) => (
							<TableRow key={person.id}>
								<TableCell className="font-medium">
									{person.group || "—"}
								</TableCell>
								<TableCell>{person.fullName}</TableCell>
								<TableCell>{person.email}</TableCell>
								<TableCell>
									{person.lastEntry
										? new Date(
												person.lastEntry
										  ).toLocaleString()
										: "—"}
								</TableCell>
								<TableCell>
									<div
										className={`flex items-center justify-center p-2 rounded-xl font-medium ${
											person.status === "present"
												? "bg-green-200 text-green-600"
												: "bg-red-200 text-red-600"
										}`}
									>
										{person.status === "present"
											? "Зашел"
											: "Отсутствует"}
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
