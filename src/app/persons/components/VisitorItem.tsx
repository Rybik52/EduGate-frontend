import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Visitor } from "../types";
import Link from "next/link";

interface VisitorItemProps {
	visitor: Visitor;
}

export function VisitorItem({ visitor }: VisitorItemProps) {
	return (
		<Link href={`/persons/${visitor.id}`}>
			<li className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
				<Avatar className="h-12 w-12">
					<AvatarImage
						src={`http://localhost:1337${visitor?.avatar?.url}`}
					/>
					<AvatarFallback>
						{visitor.fullName
							.split(" ")
							.map((n) => n[0])
							.join("")}
					</AvatarFallback>
				</Avatar>

				<div className="flex-1">
					<div className="flex items-center gap-2">
						<span className="font-medium">{visitor.fullName}</span>
						<div className="text-sm text-gray-500">
							{visitor.email}
						</div>
					</div>
					{visitor.group && (
						<div className="text-sm text-gray-500">
							{visitor.group}
						</div>
					)}
				</div>

				<div className="flex items-center gap-2">
					{visitor.roles.map((role) => (
						<Badge
							key={role}
							variant="secondary"
							className="bg-blue-50"
						>
							{role}
						</Badge>
					))}

					{visitor.positions?.map((position) => (
						<Badge
							key={position}
							variant="secondary"
							className="bg-[#D7E7FF] text-[#448EFD]"
						>
							{position}
						</Badge>
					))}
				</div>

				{visitor.blocked && (
					<div className="flex items-center gap-2">
						<Badge
							variant="secondary"
							className="bg-[#FFD9DB] text-[#FB444B]"
						>
							Заблокирован
						</Badge>
					</div>
				)}

				<div className="flex items-center gap-2">
					<span className="text-sm text-gray-500">
						{visitor.lastEntry &&
							new Date(visitor.lastEntry).toLocaleString()}
					</span>
					<div
						className={`w-3 h-3 rounded-full ${
							visitor.status === "present"
								? "bg-green-500"
								: "bg-red-500"
						}`}
					/>
				</div>
			</li>
		</Link>
	);
}
