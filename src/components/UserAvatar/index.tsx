"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

export const UserAvatar = () => {
	const { logout } = useAuth();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className="size-16 cursor-pointer">
					<AvatarImage src="https://avatars.githubusercontent.com/u/74355761?v=4" />
					<AvatarFallback>
						<Skeleton className="rounded-full w-full h-full" />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={logout}>Выйти</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
