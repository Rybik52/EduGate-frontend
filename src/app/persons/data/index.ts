import { Category } from "../types";

// export const MOCK_VISITORS: VisitorCategory[] = [
// 	{
// 		title: "Преподаватели",
// 		visitors: [
// 			{
// 				id: 1,
// 				name: "Иванов Иван Иванович",
// 				group: "ПИ19-1",
// 				tags: ["Преподаватель", "Преподаватель 1 курса"],
// 				status: "present",
// 			},
// 			{
// 				id: 2,
// 				name: "Петров Петр Петрович",
// 				group: "ПИ19-2",
// 				tags: ["Преподаватель", "Преподаватель 2 курса"],
// 				status: "present",
// 			},
// 		],
// 	},
// 	{
// 		title: "Студенты",
// 		visitors: [
// 			{
// 				id: 3,
// 				name: "Сидоров Сидор Сидорович",
// 				group: "ПИ19-3",
// 				tags: ["Студент", "Студент 1 курса"],
// 				status: "present",
// 			},
// 			{
// 				id: 4,
// 				name: "Кузнецов Кузьян Кузьянович",
// 				group: "ПИ19-4",
// 				tags: ["Студент", "Студент 2 курса"],
// 				status: "present",
// 			},
// 		],
// 	},
// 	{
// 		title: "Гости",
// 		visitors: [
// 			{
// 				id: 5,
// 				name: "Петрова Анна Петровна",
// 				tags: ["Гость"],
// 				status: "present",
// 			},
// 			{
// 				id: 6,
// 				name: "Сидорова Анна Петровна",
// 				tags: ["Гость"],
// 				status: "present",
// 			},
// 		],
// 	},
// ];

export const MOCK_CATEGORIES: Category[] = [
	{
		categoryName: "Все",
		categorySysName: "all",
		total: 0,
	},
	{
		categoryName: "Студенты",
		categorySysName: "students",
		total: 0,
	},
	{
		categoryName: "Преподаватели",
		categorySysName: "teachers",
		total: 0,
	},
	{
		categoryName: "Сотрудники",
		categorySysName: "employees",
		total: 0,
	},
	{
		categoryName: "Гости",
		categorySysName: "guests",
		total: 0,
	},
];
