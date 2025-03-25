import { useState, useRef, useCallback, useEffect } from "react";

export const useInputSearch = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [inputValue, setInputValue] = useState("");
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
	};
};
