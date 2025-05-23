"use client";

import React from "react";
import notificationIcon from "@/assets/icons/notification.svg";
import Image from "next/image";
import { SearchInput } from "../Search";
import { AnimatedBackground } from "../motion-primitives/animated-background";
import NavLink from "../NavLink";
import { usePathname } from "next/navigation";
import { UserAvatar } from "../UserAvatar";

const NAV_LINKS = [
	{ href: "/", label: "Главная" },
	{ href: "/pass", label: "Пропуски" },
	// { href: "/parking", label: "Парковка" },
	{ href: "/persons", label: "Персоны" },
];

export const Header = () => {
	const pathname = usePathname();

	return (
		<header className="flex my-8 mx-12 justify-between items-center py-4 px-7 rounded-[1.875rem] bg-[#fff] text-black">
			<div className="text-3xl font-medium">EDUGATE</div>
			<nav>
				<ul className="flex gap-4 text-black text-lg">
					<AnimatedBackground
						defaultValue={pathname}
						className="rounded-2xl bg-[#414141]"
						transition={{
							type: "spring",
							bounce: 0.2,
							duration: 0.3,
						}}
					>
						{NAV_LINKS.map((link) => (
							<button
								tabIndex={-1}
								key={link.href}
								data-id={link.href}
								className="inline-flex items-center justify-center text-black cursor-pointer transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-white"
							>
								<NavLink {...link} />
							</button>
						))}
					</AnimatedBackground>
				</ul>
			</nav>

			<div className="flex items-center gap-4 transition-all duration-300 ease-in-out">
				<SearchInput />

				<div className="size-16 rounded-full bg-[#F8F8F8] flex items-center justify-center cursor-pointer">
					<Image src={notificationIcon} alt="Уведомления" />
				</div>

				<UserAvatar />
			</div>
		</header>
	);
};
