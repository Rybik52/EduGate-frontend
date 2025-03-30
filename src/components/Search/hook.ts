import { useState, useRef, useCallback, useEffect } from "react";
import { SearchResponse } from "./types";

export const useInputSearch = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [searchResults, setSearchResults] = useState<SearchResponse | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleClick = useCallback(() => {
		if (!isExpanded) {
			setIsExpanded(true);
			setTimeout(() => inputRef.current?.focus(), 10);
		}
	}, [isExpanded]);

	const handleBlur = useCallback(() => {
		if (inputValue === "") {
			setIsExpanded(false);
		}
	}, [inputValue]);

	const handleEscape = useCallback(() => {
		setInputValue("");
		handleBlur();
		inputRef.current?.blur();
	}, [handleBlur]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			// Обработка Enter при фокусе на контейнере
			if (e.key === "Enter" && !isExpanded) {
				handleClick();
				e.preventDefault();
			}

			// Обработка Tab для навигации
			if (e.key === "Tab" && !isExpanded) {
				handleClick();
			}
		},
		[handleClick, isExpanded]
	);

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			// Для Яндекс браузера используем другое сочетание (Ctrl+Shift+K)
			if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "K") {
				e.preventDefault();
				handleClick();
			}
			// Обработка Escape
			if (e.key === "Escape") {
				handleEscape();
			}
		};

		document.addEventListener("keydown", handleKeyPress);
		return () => document.removeEventListener("keydown", handleKeyPress);
	}, [handleClick, handleEscape]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				handleBlur();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleBlur]);

	const handleSearch = useCallback(async (query: string) => {
		const normalizedQuery = query.trim().replace(/\s+/g, " ");

		if (normalizedQuery.length < 2) {
			setSearchResults(null);
			return;
		}

		setIsLoading(true);
		try {
			const response = await fetch(
				`http://localhost:1337/api/visitors/search?query=${encodeURIComponent(
					normalizedQuery
				)}`
			);
			const data = await response.json();
			setSearchResults(data);
		} catch (error) {
			console.error("Search error:", error);
			setSearchResults(null);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			handleSearch(inputValue);
		}, 300);

		return () => clearTimeout(debounceTimeout);
	}, [inputValue, handleSearch]);

	return {
		isExpanded,
		inputValue,
		inputRef,
		containerRef,
		setInputValue,
		handleClick,
		handleBlur,
		handleEscape,
		handleKeyDown,
		searchResults,
		isLoading,
	};
};
