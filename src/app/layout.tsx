import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ApiInitializer } from "@/components/ApiInitializer";
import { LayoutContent } from "@/components/LayoutContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "EduGate",
	description: "WEB-интерфейс для СКУД в образовательном учреждении",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body className={inter.className}>
				<AuthProvider>
					<ApiInitializer />
					<ProtectedRoute>
						<LayoutContent>{children}</LayoutContent>
					</ProtectedRoute>
				</AuthProvider>
			</body>
		</html>
	);
}
