import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface CategoryCardProps {
	name: string;
	total: number;
	sysName: string;
	isActive?: boolean;
	onClick: () => void;
}

export function CategoryCard({
	name,
	total,
	isActive,
	onClick,
}: CategoryCardProps) {
	return (
		<Card
			className={`p-5 min-h-32 flex flex-col justify-between cursor-pointer transition-colors ${
				isActive ? "border-[3px] border-black" : ""
			}`}
			onClick={onClick}
		>
			<CardTitle className="text-2xl text-gray-400 font-normal">
				{name}
			</CardTitle>
			<CardContent className="p-0 font-bold text-4xl">
				{total}
			</CardContent>
		</Card>
	);
}
