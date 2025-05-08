"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

interface User {
	id: number;
	username: string;
	email: string;
	// Добавьте другие поля пользователя по необходимости
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (identifier: string, password: string) => Promise<void>;
	logout: () => void;
	error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Проверяем, есть ли сохраненный токен при загрузке
		const storedToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");

		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(JSON.parse(storedUser));
		}

		setIsLoading(false);
	}, []);

	const login = async (identifier: string, password: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				"http://localhost:1337/api/auth/local",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						identifier,
						password,
					}),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error?.message || "Ошибка авторизации");
			}

			const { jwt, user } = data;

			// Сохраняем токен и данные пользователя
			localStorage.setItem("token", jwt);
			localStorage.setItem("user", JSON.stringify(user));

			setToken(jwt);
			setUser(user);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Произошла ошибка при входе"
			);
			console.error("Ошибка входа:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				isLoading,
				isAuthenticated: !!token,
				login,
				logout,
				error,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth должен использоваться внутри AuthProvider");
	}
	return context;
}
