"use client";

import Link from "next/link";

interface NavLinkProps {
	href: string;
	label: string;
}

export default function NavLink({ href, label }: Readonly<NavLinkProps>) {
	return (
		<Link href={href}>
			<li className="py-4 cursor-pointer px-6 text-2xl">{label}</li>
		</Link>
	);
}
