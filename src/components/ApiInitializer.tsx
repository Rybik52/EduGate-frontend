"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export function ApiInitializer() {
	const { token } = useAuth();

	useEffect(() => {
		const originalFetch = window.fetch;

		window.fetch = async function (input, init) {
			// Создаем новый объект с заголовками
			const newInit = { ...init };

			// Если есть токен, добавляем его в заголовки
			if (token) {
				newInit.headers = {
					...newInit.headers,
					Authorization: `Bearer ${token}`,
				};
			}

			// Вызываем оригинальный fetch с новыми заголовками
			return originalFetch(input, newInit);
		};

		// Восстанавливаем оригинальный fetch при размонтировании компонента
		return () => {
			window.fetch = originalFetch;
		};
	}, [token]);

	return null;
}
