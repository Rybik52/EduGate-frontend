import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { InviteStatusBadge } from "./InviteStatusBadge";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { InvitedVisitor } from "@/app/pass/guests/types";

export interface VisitorItemProps {
	visitor: InvitedVisitor;
	hasInvited?: boolean;
	hasInviteRequest?: boolean;
	onDelete?: () => void;
	onStatusUpdate?: (status: string) => void;
}

export function VisitorItem({
	visitor,
	hasInvited = false,
	hasInviteRequest = false,
	onDelete,
	onStatusUpdate,
}: VisitorItemProps) {
	const formatDate = (dateString: string) => {
		return format(new Date(dateString), "d.MM.yyyy", { locale: ru });
	};

	const formatDateTime = (dateString: string) => {
		return format(new Date(dateString), "d.MM.yyyy - HH:mm", {
			locale: ru,
		});
	};

	return (
		<div className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg">
			<Link href={`/persons/${visitor.id}`} className="flex-1">
				<li className="flex items-center gap-4 cursor-pointer">
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
							<span className="font-medium">
								{visitor.fullName}
							</span>
							{!hasInvited && !hasInviteRequest && (
								<div className="text-sm text-gray-500">
									{visitor.email}
								</div>
							)}
						</div>

						{!hasInvited && !hasInviteRequest && visitor.group && (
							<div className="text-sm text-gray-500">
								{visitor.group}
							</div>
						)}

						{hasInvited ||
							(hasInviteRequest &&
								"createdAt" in visitor &&
								visitor.createdAt && (
									<div className="text-sm text-gray-500">
										Приглашение создано:{" "}
										{formatDateTime(visitor.createdAt)}
									</div>
								))}
					</div>

					{hasInvited &&
						"validFrom" in visitor &&
						visitor.validTo && (
							<div className="flex items-center gap-2">
								<Badge className="bg-[#D7E7FF] text-[#448EFD]">
									c {formatDate(visitor.validFrom || "")} - до{" "}
									{formatDate(visitor?.validTo)}
								</Badge>
							</div>
						)}

					{hasInviteRequest && !hasInvited && (
						<div className="flex items-center gap-2">
							<InviteStatusBadge status={visitor.link_status} />
						</div>
					)}

					{!hasInvited && !hasInviteRequest && (
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
					)}

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

					{!hasInviteRequest && (
						<div className="flex items-center gap-2">
							{!hasInvited && (
								<span className="text-sm text-gray-500">
									{visitor.lastEntry &&
										new Date(
											visitor.lastEntry
										).toLocaleString()}
								</span>
							)}
							<div
								className={`w-3 h-3 rounded-full ${
									visitor.status === "present"
										? "bg-green-500"
										: "bg-red-500"
								}`}
							/>
						</div>
					)}
				</li>
			</Link>

			{/* Кнопки действий */}
			<div className="flex gap-2">
				{hasInviteRequest && onStatusUpdate && (
					<div className="flex gap-1">
						{visitor.link_status !== "Одобрено" && (
							<Button
								size="sm"
								variant="outline"
								className="text-green-600 border-green-600 hover:bg-green-50"
								onClick={() => onStatusUpdate("Одобрено")}
							>
								Одобрить
							</Button>
						)}
						{visitor.link_status !== "Отказано" && (
							<Button
								size="sm"
								variant="outline"
								className="text-red-600 border-red-600 hover:bg-red-50"
								onClick={() => onStatusUpdate("Отказано")}
							>
								Отклонить
							</Button>
						)}
					</div>
				)}

				{onDelete && (
					<Button
						size="sm"
						variant="outline"
						className="text-red-600 border-red-600 hover:bg-red-50"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onDelete();
						}}
					>
						Удалить
					</Button>
				)}
			</div>
		</div>
	);
}
