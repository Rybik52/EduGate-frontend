import { Visitor } from "@/app/persons/types";

// Интерфейс для создания приглашения
export interface InvitationFormData {
	firstName: string;
	lastName: string;
	surname: string;
	email: string;
	validFrom: Date;
	validTo: Date;
	persone_roles?: number[];
}

// Интерфейс для API ответа
export interface ApiResponse {
	data: InvitedVisitor[];
	meta?: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

export interface ApiResponse {
	data: InvitedVisitor[];
	meta?: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

export interface InvitedVisitor extends Visitor {
	createdAt?: string;
	updatedAt?: string;
	invitedBy?: string;
	validFrom?: string;
	validTo?: string;
	documentId?: string;
	token?: string;
	link_status?: "На рассмотрении" | "Одобрено" | "Отказано";
	visitor_data?: {
		email: string;
		surname: string;
		lastName: string;
		firstName: string;
		persone_roles: string[];
	};
	publishedAt?: string;
	created_by_user?: {
		id: number;
		username: string;
		email: string;
	};
}

export interface MyInvitationsListProps {
	myInvitations: InvitedVisitor[];
	handleUpdateStatus: (id: number, status: string) => void;
	
}

export interface CreateInvitationModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	formData: InvitationFormData;
	setFormData: (data: InvitationFormData) => void;
	handleCreateInvitation: () => void;
}

export interface InvitationsListProps {
	invitations: InvitedVisitor[];
	isLoading: boolean;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	handleDeleteInvitation: (id: number) => void;
}
