"use client";

import { Header } from "@/components/Header";
import { usePathname } from "next/navigation";

interface LayoutContentProps {
	children: React.ReactNode;
}

export function LayoutContent({ children }: LayoutContentProps) {
	const pathname = usePathname();
	const showHeader = pathname !== "/login";

	return (
		<>
			{showHeader && <Header />}
			<main className="mx-12">{children}</main>
		</>
	);
}
