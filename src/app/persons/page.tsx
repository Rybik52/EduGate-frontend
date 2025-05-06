"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { CategoryCard } from "./components/CategoryCard";
import { VisitorList } from "./components/VisitorList";
import { ApiResponse, VisitorCategory, Category } from "./types";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const ROLE_MAP: Record<string, string> = {
	students: "Студент",
	employees: "Сотрудник",
	guests: "Гость",
};

const POSITION_MAP: Record<string, string> = {
	teachers: "Преподаватель",
	curator: "Куратор",
};

export default function PersonsPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [visitors, setVisitors] = useState<VisitorCategory[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [isLoading, setIsLoading] = useState(true);
	const [categories, setCategories] = useState<Category[]>([]);

	// Эффект для загрузки категорий
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch(
					"http://localhost:1337/api/visitors/categories"
				);
				const data = (await response.json()) as Category[];

				// Проверяем, есть ли уже категория "Все" в данных
				const hasAllCategory = data.some(
					(cat) => cat.categorySysName === "all"
				);

				// Добавляем категорию "Все" только если её нет в данных
				const allCategories = hasAllCategory
					? data
					: [
							{
								categoryName: "Все",
								categorySysName: "all",
								total: 0,
							},
							...data,
					  ];

				setCategories(allCategories);
			} catch (error) {
				console.error("Ошибка при загрузке категорий:", error);
				// Если не удалось загрузить категории, используем пустой массив
				setCategories([
					{
						categoryName: "Все",
						categorySysName: "all",
						total: 0,
					},
				]);
			}
		};

		fetchCategories();
	}, []);

	// Эффект для загрузки посетителей
	useEffect(() => {
		const fetchVisitors = async () => {
			setIsLoading(true);
			try {
				let url = "http://localhost:1337/api/visitors/by-role";
				const params = new URLSearchParams();

				if (selectedCategory !== "all") {
					if (ROLE_MAP[selectedCategory]) {
						params.append("role", ROLE_MAP[selectedCategory]);
					} else if (POSITION_MAP[selectedCategory]) {
						params.append(
							"position",
							POSITION_MAP[selectedCategory]
						);
					}
				}

				if (searchQuery) {
					params.append("search", searchQuery);
				}

				const queryString = params.toString();
				if (queryString) {
					url += `?${queryString}`;
				}

				const response = await fetch(url);
				const data: ApiResponse = await response.json();

				if (selectedCategory === "all") {
					const categorizedData = categories
						.filter((cat) => cat.categorySysName !== "all")
						.map((category) => {
							const categoryVisitors = data.data.filter(
								(visitor) => {
									if (ROLE_MAP[category.categorySysName]) {
										return visitor.roles.includes(
											ROLE_MAP[category.categorySysName]
										);
									}
									return visitor.roles.includes(
										POSITION_MAP[category.categorySysName]
									);
								}
							);
							return {
								title: category.categoryName,
								visitors: categoryVisitors,
							};
						})
						.filter((category) => category.visitors.length > 0);

					setVisitors(categorizedData);
				} else {
					setVisitors([
						{
							title:
								categories.find(
									(c) =>
										c.categorySysName === selectedCategory
								)?.categoryName || "Все",
							visitors: data.data,
						},
					]);
				}
			} catch (error) {
				console.error("Failed to fetch visitors:", error);
			} finally {
				setIsLoading(false);
			}
		};

		const debounce = setTimeout(fetchVisitors, 300);
		return () => clearTimeout(debounce);
	}, [searchQuery, selectedCategory, categories]);

	const handleCategoryClick = (sysName: string) => {
		setSelectedCategory(sysName);
		setSearchQuery("");
	};

	return (
		<div className="flex gap-8 h-[75vh]">
			<div className="flex flex-col gap-8 w-80 overflow-y-auto">
				{isLoading && categories.length === 0
					? Array(5)
							.fill(0)
							.map((_, i) => (
								<Card
									className="h-32 w-full p-4 flex  flex-col gap-2 justify-center"
									key={i}
								>
									<Skeleton className="h-5 w-1/2 bg-gray-200" />
									<Skeleton className="h-5 w-1/4 bg-gray-200" />
								</Card>
							))
					: categories?.map((category) => (
							<CategoryCard
								key={category.categorySysName}
								name={category.categoryName}
								total={category.total}
								sysName={category.categorySysName}
								isActive={
									selectedCategory ===
									category.categorySysName
								}
								onClick={() =>
									handleCategoryClick(
										category.categorySysName
									)
								}
							/>
					  ))}
			</div>

			<div className="flex flex-col gap-5 w-full">
				<div className="w-96">
					<Input
						className="rounded-2xl p-6"
						placeholder="Поиск..."
						type="text"
						suffixIcon={<Search />}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				<div className="w-full flex-1 overflow-y-auto bg-white rounded-2xl p-6">
					<VisitorList categories={visitors} isLoading={isLoading} />
				</div>
			</div>
		</div>
	);
}
