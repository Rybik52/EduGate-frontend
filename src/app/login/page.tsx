"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
	const [identifier, setIdentifier] = useState("");
	const [password, setPassword] = useState("");
	const { login, isLoading, error, isAuthenticated } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await login(identifier, password);
	};

	// Если пользователь уже авторизован, перенаправляем на главную
	if (isAuthenticated) {
		router.push("/");
		return null;
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-[400px] bg-gray-200">
				<CardHeader>
					<CardTitle className="text-2xl text-center">
						Вход в систему
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						{error && (
							<Alert variant="destructive">
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						<div className="space-y-2">
							<label htmlFor="identifier">
								Email или имя пользователя
							</label>
							<Input
								id="identifier"
								type="text"
								value={identifier}
								onChange={(e) => setIdentifier(e.target.value)}
								required
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="password">Пароль</label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>

						<Button
							type="submit"
							className="w-full bg-[#448EFD]"
							disabled={isLoading}
						>
							{isLoading ? "Вход..." : "Войти"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
