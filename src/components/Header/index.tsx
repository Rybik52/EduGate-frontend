import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import notificationIcon from "../../app/assets/icons/Notification.svg";
import Image from "next/image";
import NavLink from "../NavLink";
import { SearchInput } from "../Search";

const NAV_LINKS = [
	{ href: "/", label: "Главная" },
	{ href: "/pass", label: "Пропуски" },
	{ href: "/parking", label: "Парковка" },
	{ href: "/persons", label: "Персоны" },
];

export const Header = () => {
	return (
		<header className="flex my-8 mx-12 justify-between items-center py-4 px-7 rounded-[1.875rem] bg-[#fff] color-[#333] text-black">
			<div className="text-3xl font-medium">EDUGATE</div>
			<nav>
				<ul className="flex gap-4 text-black text-lg">
					{NAV_LINKS.map((link) => (
						<NavLink
							key={link.href}
							href={link.href}
							label={link.label}
						/>
					))}
				</ul>
			</nav>

			<div className="flex items-center gap-4 transition-all duration-300 ease-in-out">
				<SearchInput />

				<div className="size-16 rounded-full bg-[#F8F8F8] flex items-center justify-center cursor-pointer">
					<Image src={notificationIcon} alt="Уведомления" />
				</div>

				<Avatar className="size-16 cursor-pointer">
					<AvatarImage src="https://avatars.githubusercontent.com/u/74355761?v=4" />
					<AvatarFallback>Test</AvatarFallback>
				</Avatar>
			</div>
		</header>
	);
};
