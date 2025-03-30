interface Position {
	id: number;
	documentId: string;
	name: string;
}

interface Department {
	id: number;
	documentId: string;
	name: string;
}

interface StudentsGroup {
	id: number;
	documentId: string;
	name: string;
}

export interface Person {
	id: number;
	surname: string;
	firstName: string;
	lastName: string;
	email: string;
	blocked: boolean;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
	documentId: string;
	locale: string | null;
	persone_roles: unknown[];
	positions: Position[];
	departaments: Department[];
	students_groups: StudentsGroup[];
	avatar?: {
		url: string;
		id: number;
	};
}

export interface SearchResponse {
	students: Person[];
	staff: Person[];
	departmentMembers: Person[];
	other: Person[];
}
