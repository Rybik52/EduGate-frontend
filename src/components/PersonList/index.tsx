"use client";

import { useEffect, useState } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { PersonTable } from "./PersonTable";
import { ApiResponse, Person, PersonListProps } from "./types";

export function PersonList({ role, title, position }: PersonListProps) {
	const [persons, setPersons] = useState<Person[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagination, setPagination] = useState<ApiResponse["pagination"]>();
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fetchPersons = async () => {
			try {
				// const searchParam = searchQuery ? `&search=${searchQuery}` : "";
				const queryParams = new URLSearchParams({
					...(role && { role }),
					...(position && { position }),
					page: currentPage.toString(),
				});

				if (searchQuery) {
					queryParams.append("search", searchQuery);
				}

				const response = await fetch(
					`http://localhost:1337/api/visitors/by-role?${queryParams.toString()}`
				);
				const data: ApiResponse = await response.json();
				setPersons(data.data);
				setPagination(data.pagination);
			} catch (error) {
				console.error("Failed to fetch persons:", error);
			} finally {
				setIsLoading(false);
			}
		};

		const debounce = setTimeout(() => {
			setIsLoading(true);
			fetchPersons();
		}, 300);

		return () => clearTimeout(debounce);
	}, [currentPage, searchQuery, role, position]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		setIsLoading(true);
	};

	return (
		<div>
			<div className="flex flex-col gap-4">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/persons">
								Персоны
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{title}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			<div className="flex justify-between w-full my-4">
				<h2 className="font-medium text-5xl">{title}</h2>
				<div className="w-[40rem]">
					<Input
						type="search"
						placeholder="Поиск"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			{persons.length !== 0 ? (
				<PersonTable persons={persons} isLoading={isLoading} />
			) : (
				<h1>Персоны не найдены</h1>
			)}

			{pagination && pagination.page > 1 && (
				<div className="mt-4">
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									onClick={() =>
										handlePageChange(currentPage - 1)
									}
									className={
										currentPage === 1
											? "pointer-events-none opacity-50"
											: "cursor-pointer"
									}
								/>
							</PaginationItem>

							{Array.from(
								{ length: pagination.pageCount },
								(_, i) => i + 1
							).map((page) => (
								<PaginationItem key={page}>
									<PaginationLink
										onClick={() => handlePageChange(page)}
										isActive={currentPage === page}
										className="cursor-pointer"
									>
										{page}
									</PaginationLink>
								</PaginationItem>
							))}

							<PaginationItem>
								<PaginationNext
									onClick={() =>
										handlePageChange(currentPage + 1)
									}
									className={
										currentPage === pagination.pageCount
											? "pointer-events-none opacity-50"
											: "cursor-pointer"
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}
		</div>
	);
}
