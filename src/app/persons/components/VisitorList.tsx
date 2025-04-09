import { VisitorCategory } from "../types";
import { VisitorItem } from "./VisitorItem";

interface VisitorListProps {
	categories: VisitorCategory[];
}

export function VisitorList({ categories }: VisitorListProps) {
	return (
		<ul className="list-none flex flex-col gap-8">
			{categories.map((category) => (
				<li key={category.title} className="flex flex-col gap-4">
					<h3 className="text-2xl text-gray-500">{category.title}</h3>
					<ul className="list-none flex flex-col gap-4">
						{category.visitors.map((visitor) => (
							<VisitorItem key={visitor.id} visitor={visitor} />
						))}
					</ul>
				</li>
			))}
		</ul>
	);
}
