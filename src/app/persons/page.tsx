"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { CategoryCard } from "./components/CategoryCard";
import { VisitorList } from "./components/VisitorList";
import { MOCK_VISITORS, MOCK_CATEGORIES } from "./data";

export default function PersonsPage() {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<div className="flex gap-8 h-[75vh]">
			<div className="flex flex-col gap-8 w-80 overflow-y-auto">
				{MOCK_CATEGORIES.map((category) => (
					<CategoryCard
						key={category.categorySysName}
						name={category.categoryName}
						total={category.total}
						sysName={category.categorySysName}
					/>
				))}
			</div>

			<div className="flex flex-col gap-5 w-full">
				<div className="w-96">
					<Input
						className="rounded-2xl"
						placeholder="Поиск..."
						type="text"
						suffixIcon={<Search />}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				<div className="w-full flex-1 overflow-y-auto bg-white rounded-2xl p-6">
					<VisitorList categories={MOCK_VISITORS} />
				</div>
			</div>
		</div>
	);
}
