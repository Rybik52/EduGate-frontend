export interface Visitor {
	id: number;
	name: string;
	group?: string;
	tags: string[];
	status: "present" | "absent";
	blocked?: boolean;
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
