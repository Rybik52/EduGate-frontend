export interface Person {
	id: number;
	fullName: string;
	email: string;
	group: string | null;
	roles: string[];
	status: "present" | "absent";
	lastEntry: string | null;
	lastExit: string | null;
}

export interface ApiResponse {
	data: Person[];
	pagination: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	};
}

export interface PersonListProps {
	role?: "Студент" | "Сотрудник";
	position?: "Преподаватель" | "Куратор" | "Волонтёр";
	title: string;
}
