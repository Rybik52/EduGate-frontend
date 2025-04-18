export interface Visitor {
	id: number;
	fullName: string;
	email: string;
	group: string | null;
	roles: string[];
	status: "present" | "absent";
	lastEntry: string | null;
	lastExit: string | null;
	blocked: boolean;
	avatar?: AvatarType;
	positions: string[];
}

type AvatarType = {
	url: string;
};

export interface ApiResponse {
	data: Visitor[];
	pagination: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	};
}

export interface VisitorCategory {
	title: string;
	visitors: Visitor[];
}

export interface Category {
	categoryName: string;
	categorySysName: string;
	total: number;
}
