"use client";
import { Search } from "lucide-react";
import { useInputSearch } from "./hook";
import { SearchResults } from "./SearchResults";

interface SearchInputProps {
	className?: string;
}

export const SearchInput = ({ className = "" }: SearchInputProps) => {
	const {
		isExpanded,
		inputValue,
		setInputValue,
		inputRef,
		containerRef,
		handleClick,
		handleBlur,
		handleKeyDown,
		searchResults,
		isLoading,
	} = useInputSearch();

	return (
		<div className="relative">
			<div
				ref={containerRef}
				tabIndex={0}
				role="search"
				className={`flex items-center transition-all duration-300 ease-in-out ${
					isExpanded
						? "bg-[#F8F8F8] rounded-3xl pl-6 border border-[#DCDCDC]"
						: "rounded-3xl border border-transparent"
				} ${className}`}
				onKeyDown={handleKeyDown}
			>
				{isExpanded && (
					<input
						ref={inputRef}
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onBlur={handleBlur}
						className="bg-transparent outline-none w-full text-black placeholder-gray-500 pr-2"
						placeholder="Поиск..."
					/>
				)}
				<button
					className={`size-16 flex items-center justify-center cursor-pointer shrink-0 ${
						isExpanded
							? "bg-transparent"
							: "bg-[#F8F8F8] rounded-3xl"
					}`}
					onClick={handleClick}
					aria-label="Search"
				>
					<Search
						className={isExpanded ? "text-gray-500" : "text-black"}
					/>
				</button>
			</div>
			{isExpanded && (
				<SearchResults results={searchResults} isLoading={isLoading} />
			)}
		</div>
	);
};
