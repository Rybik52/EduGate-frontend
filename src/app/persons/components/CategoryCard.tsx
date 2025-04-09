import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface CategoryCardProps {
	name: string;
	total: number;
	sysName: string;
}

export function CategoryCard({ name, total }: CategoryCardProps) {
	return (
		<Card className="p-5 min-h-32 flex flex-col justify-between">
			<CardTitle className="text-2xl text-gray-400 font-normal">
				{name}
			</CardTitle>
			<CardContent className="p-0 font-bold text-4xl">
				{total}
			</CardContent>
		</Card>
	);
}
