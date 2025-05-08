import { VisitorItem } from "@/app/persons/components/VisitorItem";
import { MyInvitationsListProps } from "../types";

export const MyInvitationsList = ({
	myInvitations,
	handleUpdateStatus,
}: MyInvitationsListProps) => {
	return (
		<div className="flex flex-col w-[30%] bg-white rounded-2xl p-6">
			<div className="flex justify-between items-center">
				<p className="font-bold text-lg">Созданные приглашения</p>

				<div className="flex gap-2 items-center">
					<p className="font-bold text-gray-400">Статус</p>
					<div className="flex gap-1 items-center">
						<div
							className="rounded w-5 h-5 bg-yellow-200"
							title="На рассмотрении"
						/>
						<div
							className="rounded w-5 h-5 bg-green-200"
							title="Одобрено"
						/>
						<div
							className="rounded w-5 h-5 bg-red-200"
							title="Отказано"
						/>
					</div>
				</div>
			</div>

			{myInvitations.length > 0 ? (
				<ul className="list-none mt-4">
					{myInvitations.map((invitation) => (
						<VisitorItem
							key={invitation.id}
							visitor={{
								id: invitation.id,
								fullName: `${
									invitation.visitor_data?.surname
								} ${invitation.visitor_data?.firstName} ${
									invitation.visitor_data?.lastName || ""
								}`.trim(),
								email: invitation.visitor_data?.email || "",
								validFrom: invitation.validFrom,
								validTo: invitation.validTo,
								link_status: invitation.link_status,
								roles: [],
								positions: [],
								status: "absent",
								group: "",
								createdAt: invitation.createdAt,
							}}
							hasInviteRequest
							onStatusUpdate={(status) =>
								handleUpdateStatus(invitation.id, status)
							}
						/>
					))}
				</ul>
			) : (
				<div className="flex justify-center items-center h-32 mt-4">
					<p>У вас нет созданных приглашений</p>
				</div>
			)}
		</div>
	);
};
