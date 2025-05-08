import { VisitorItem } from "@/app/persons/components/VisitorItem";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { InvitationsListProps } from "../types";

export const InvitationsList = ({
	invitations,
	isLoading,
	searchQuery,
	setSearchQuery,
	handleDeleteInvitation,
}: InvitationsListProps) => {
	return (
		<div className="flex flex-col gap-8 w-2/3">
			<div className="flex flex-col mt-5 w-full">
				<div className="flex justify-between w-full">
					<h3 className="font-bold text-3xl">Все приглашения</h3>
					<div className="w-1/4">
						<Input
							className="flex items-center justify-center rounded-xl"
							type="search"
							placeholder="Поиск приглашений"
							suffixIcon={<SearchIcon />}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>
			</div>

			<div className="w-full h-screen flex-1 overflow-y-auto bg-white rounded-2xl p-6">
				{isLoading ? (
					<div className="flex justify-center items-center h-full">
						<p>Загрузка приглашений...</p>
					</div>
				) : invitations.length > 0 ? (
					<ul className="list-none flex flex-col gap-4">
						{invitations.map((invitation) => (
							<VisitorItem
								key={invitation.id}
								visitor={{
									id: invitation.id,
									fullName: `${
										invitation.visitor_data?.surname
									} ${invitation.visitor_data?.firstName} ${
										invitation.visitor_data?.lastName || ""
									}`.trim(),
									email: invitation.visitor_data?.email ?? "",
									validFrom: invitation.validFrom,
									validTo: invitation.validTo,
									link_status: invitation.link_status,

									roles: [],
									positions: [],
									status: "absent",
									group: "",
									createdAt: invitation.createdAt,
								}}
								hasInvited
								onDelete={() =>
									handleDeleteInvitation(invitation.id)
								}
							/>
						))}
					</ul>
				) : (
					<div className="flex justify-center items-center h-full">
						<p>Приглашения не найдены</p>
					</div>
				)}
			</div>
		</div>
	);
};
