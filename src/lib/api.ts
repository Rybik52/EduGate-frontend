// Утилита для выполнения запросов с JWT токеном
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
	const token = localStorage.getItem("token");

	const headers = {
		...options.headers,
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};

	return fetch(url, {
		...options,
		headers,
	});
}

// Функция для обновления всех существующих fetch-запросов
export function createAuthFetch() {
	const originalFetch = window.fetch;

	window.fetch = async function (
		input: RequestInfo | URL,
		init?: RequestInit
	) {
		const token = localStorage.getItem("token");

		if (token && init) {
			const headers = new Headers(init.headers);
			headers.set("Authorization", `Bearer ${token}`);

			init.headers = headers;
		}

		return originalFetch.call(window, input, init);
	};
}
