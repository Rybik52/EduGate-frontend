import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { SearchResponse, Person } from "./types";
import { Badge } from "../ui/badge";

interface SearchResultsProps {
	results: SearchResponse | null;
	isLoading: boolean;
}

interface PersonCardProps {
	person: Person;
}

const PersonCard = ({ person }: PersonCardProps) => (
	<Link href={`/persons/${person.id}`}>
		<div className="p-4 border rounded-lg mb-2 hover:bg-gray-50">
			<div className="flex gap-2 items-center">
				{person?.avatar && (
					<Avatar>
						<AvatarImage
							width={50}
							src={`http://localhost:1337${person.avatar.url}`}
						/>
						<AvatarFallback>
							<Skeleton className="rounded-full w-full h-full" />
						</AvatarFallback>
					</Avatar>
				)}

				<div>
					{person.blocked && (
						<Badge className="bg-red-500 text-white">
							Заблокирован
						</Badge>
					)}
					<div className="font-medium">
						{person.surname} {person.firstName} {person.lastName}
					</div>
					<div className="text-sm text-gray-600">{person.email}</div>
				</div>
			</div>

			{person.students_groups && (
				<div className="text-sm text-gray-600">
					{person.students_groups
						.map((group) => group.name)
						.join(", ")}
				</div>
			)}

			{person.positions.length > 0 && (
				<div className="text-sm text-gray-500 mt-1">
					{person.positions.map((pos) => pos.name).join(", ")}
				</div>
			)}
		</div>
	</Link>
);

export const SearchResults = ({ results, isLoading }: SearchResultsProps) => {
	if (isLoading) {
		return (
			<div className="mt-2 p-4 bg-white rounded-lg shadow-lg absolute z-10">
				<div className="mb-4">
					<h3 className="text-lg mb-2">
						<Skeleton className="w-[10rem] h-2" />
					</h3>

					<div className="p-4 border rounded-lg mb-2 hover:bg-gray-50">
						<div className="font-medium">
							<Skeleton className="w-[10rem] h-2" />
						</div>
						<div className="text-sm text-gray-600 mt-2">
							<Skeleton className="w-[5rem] h-2" />
						</div>

						<div className="text-sm text-gray-500 mt-1">
							<Skeleton className="w-[5rem] h-2" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!results) return null;

	return (
		<div className="mt-2 p-4 bg-white rounded-lg shadow-lg absolute z-10 max-h-[15rem] overflow-x-auto w-max">
			{results.staff.length > 0 && (
				<div className="mb-4">
					<h3 className="text-lg mb-2">Сотрудники</h3>
					{results.staff.map((person) => (
						<PersonCard key={person.id} person={person} />
					))}
				</div>
			)}

			{results.students.length > 0 && (
				<div className="mb-4">
					<h3 className="text-lg mb-2">Студенты</h3>
					{results.students.map((person) => (
						<PersonCard key={person.id} person={person} />
					))}
				</div>
			)}

			{results.other.length > 0 && (
				<div className="mb-4">
					<h3 className="text-lg mb-2">Гости</h3>
					{results.other.map((person) => (
						<PersonCard key={person.id} person={person} />
					))}
				</div>
			)}

			{results.staff.length === 0 && results.students.length === 0 && (
				<div className="text-center text-gray-500">
					Нечего не найдено 😢
				</div>
			)}
		</div>
	);
};
