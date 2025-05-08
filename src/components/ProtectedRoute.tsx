"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";
import { motion } from "motion/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (!isLoading && !isAuthenticated && pathname !== "/login") {
			router.push("/login");
		}
	}, [isAuthenticated, isLoading, router, pathname]);

	if (isLoading) {
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<motion.div
					animate={{
						rotate: 360,
					}}
					transition={{
						duration: 1,
						repeat: Infinity,
						ease: "linear",
					}}
				>
					<Loader size={50} />
				</motion.div>
			</div>
		);
	}

	if (!isAuthenticated && pathname !== "/login") {
		return null;
	}

	return <>{children}</>;
}
