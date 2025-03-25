"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
	href: string;
	label: string;
}

export default function NavLink({ href, label }: Readonly<NavLinkProps>) {
	const pathname = usePathname();

	return (
		<Link href={href}>
			<li
				className="py-4 px-6 text-2xl rounded-[1rem] transition-colors"
				style={{
					backgroundColor: pathname === href ? "#414141" : "#F8F8F8",
					color: pathname === href ? "white" : "inherit",
				}}
			>
				{label}
			</li>
		</Link>
	);
}
