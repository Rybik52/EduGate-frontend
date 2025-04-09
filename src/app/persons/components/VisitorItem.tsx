import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Visitor } from "../types";

interface VisitorItemProps {
	visitor: Visitor;
}

export function VisitorItem({ visitor }: VisitorItemProps) {
	return (
		<li className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
			<Avatar className="h-12 w-12">
				<AvatarFallback>
					{visitor.name
						.split(" ")
						.map((n) => n[0])
						.join("")}
				</AvatarFallback>
			</Avatar>

			<div className="flex-1">
				<div className="flex items-center gap-2">
					<span className="font-medium">{visitor.name}</span>
					{visitor.blocked && (
						<Badge variant="destructive" className="text-xs">
							Заблокирован
						</Badge>
					)}
				</div>
				{visitor.group && (
					<div className="text-sm text-gray-500">{visitor.group}</div>
				)}
			</div>

			<div className="flex items-center gap-2">
				{visitor.tags.map((tag) => (
					<Badge
						key={tag}
						variant="secondary"
						className="bg-blue-50 hover:bg-blue-100"
					>
						{tag}
					</Badge>
				))}
			</div>

			<div
				className={`w-3 h-3 rounded-full ${
					visitor.status === "present" ? "bg-green-500" : "bg-red-500"
				}`}
			/>
		</li>
	);
}
