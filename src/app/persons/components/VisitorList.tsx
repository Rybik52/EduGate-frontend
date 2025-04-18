import { VisitorCategory } from "../types";
import { VisitorItem } from "./VisitorItem";
import { Skeleton } from "@/components/ui/skeleton";

interface VisitorListProps {
	categories: VisitorCategory[];
	isLoading: boolean;
}

export function VisitorList({ categories, isLoading }: VisitorListProps) {
	if (isLoading) {
		return (
			<div className="space-y-8">
				{[1, 2, 3].map((i) => (
					<div key={i} className="space-y-4">
						<Skeleton className="h-8 w-48" />
						<div className="space-y-3">
							{[1, 2, 3].map((j) => (
								<Skeleton key={j} className="h-16 w-full" />
							))}
						</div>
					</div>
				))}
			</div>
		);
	}

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
