"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGuestsPage } from "./useGuestsPage";
import { BreadcrumbNav } from "./components/BreadcrumbNav";
import { InvitationsList } from "./components/InvitationsList";
import { MyInvitationsList } from "./components/MyInvitationsList";
import { CreateInvitationModal } from "./components/CreateInvitationModal";

export default function GuestsPage() {
	const {
		invitations,
		myInvitations,
		isLoading,
		searchQuery,
		setSearchQuery,
		error,
		isCreateModalOpen,
		setIsCreateModalOpen,
		formData,
		setFormData,
		handleCreateInvitation,
		handleDeleteInvitation,
		handleUpdateStatus,
	} = useGuestsPage();

	return (
		<div className="max-h-[70vh] h-[70vh]">
			<BreadcrumbNav />

			{error && (
				<Alert variant="destructive" className="mt-2">
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			<div className="flex justify-end mt-2">
				<Button
					className="bg-[#448EFD] rounded-2xl"
					onClick={() => setIsCreateModalOpen(true)}
				>
					<Plus className="mr-1 h-4 w-4" /> Новое приглашение
				</Button>
			</div>

			<div className="flex justify-between mt-5 h-[90%]">
				<InvitationsList
					invitations={invitations}
					isLoading={isLoading}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					handleDeleteInvitation={handleDeleteInvitation}
				/>

				<MyInvitationsList
					myInvitations={myInvitations}
					handleUpdateStatus={handleUpdateStatus}
				/>
			</div>

			<CreateInvitationModal
				isOpen={isCreateModalOpen}
				onOpenChange={setIsCreateModalOpen}
				formData={formData}
				setFormData={setFormData}
				handleCreateInvitation={handleCreateInvitation}
			/>
		</div>
	);
}
