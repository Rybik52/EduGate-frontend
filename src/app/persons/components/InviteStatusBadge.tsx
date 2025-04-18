import { Badge } from "@/components/ui/badge";
import { InvitedVisitor } from "../types";

interface InviteStatusBadgeProps {
	status: InvitedVisitor["invitedStatus"];
}

const statusStyles = {
	"На рассмотрении": {
		background: "#FFF4DE",
		text: "#F9A826",
	},
	Одобрено: {
		background: "#CDEFD7",
		text: "#2BA24C",
	},
	Отказано: {
		background: "#FFD9DB",
		text: "#FB444B",
	},
} as const;

export function InviteStatusBadge({ status }: InviteStatusBadgeProps) {
	if (!status) return null;

	const style = statusStyles[status];

	return (
		<Badge className={`bg-[${style.background}] text-[${style.text}]`}>
			{status}
		</Badge>
	);
}
