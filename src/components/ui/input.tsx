import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	suffixIcon?: React.ReactNode;
	prefixIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, suffixIcon, prefixIcon, ...props }, ref) => {
		return (
			<div className="relative w-full">
				{prefixIcon && (
					<div className="absolute left-3 top-1/2 -translate-y-1/2">
						{prefixIcon}
					</div>
				)}

				<input
					type={type}
					className={cn(
						"flex h-10 w-full rounded-md border-input bg-background pl-2 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						prefixIcon && "pl-10",
						suffixIcon && "pr-10",
						className
					)}
					ref={ref}
					{...props}
				/>
				{suffixIcon && (
					<div className="absolute right-3 top-1/2 -translate-y-1/2">
						{suffixIcon}
					</div>
				)}
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
