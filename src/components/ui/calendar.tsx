"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DayPickerProvider } from "react-day-picker";
import { ru } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) {
	return (
		<DayPickerProvider initialProps={{ locale: ru }}>
			<DayPicker
				showOutsideDays={showOutsideDays}
				className={cn("p-3 w-full h-full", className)}
				classNames={{
					months: "flex flex-col sm:flex-col space-y-4 sm:space-x-4 sm:space-y-0 w-full h-full",
					month: "space-y-4 w-full h-full flex flex-col",
					caption:
						"flex justify-center pt-1 relative items-center text-xl",
					caption_label: "text-xl font-medium",
					nav: "space-x-1 flex items-center",
					nav_button: cn(
						buttonVariants({ variant: "outline" }),
						"h-10 w-10 bg-transparent p-0 opacity-50 hover:opacity-100"
					),
					nav_button_previous: "absolute left-1",
					nav_button_next: "absolute right-1",
					table: "w-full h-full border-collapse flex-1",
					head_row: "flex w-full justify-between mb-4",
					head_cell:
						"text-muted-foreground rounded-md w-14 font-normal text-base",
					row: "flex w-full justify-between mb-2",
					cell: "h-14 w-14 text-center p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
					day: cn(
						buttonVariants({ variant: "ghost" }),
						"h-14 w-14 p-0 font-normal text-base aria-selected:opacity-100"
					),
					day_range_end: "day-range-end",
					day_selected:
						"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
					day_today: "bg-accent text-accent-foreground",
					day_outside:
						"day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
					day_disabled: "text-muted-foreground opacity-50",
					day_range_middle:
						"aria-selected:bg-accent aria-selected:text-accent-foreground",
					day_hidden: "invisible",
					...classNames,
				}}
				components={{
					IconLeft: ({ className, ...props }) => (
						<ChevronLeft
							className={cn("h-4 w-4", className)}
							{...props}
						/>
					),
					IconRight: ({ className, ...props }) => (
						<ChevronRight
							className={cn("h-4 w-4", className)}
							{...props}
						/>
					),
				}}
				locale={ru}
				{...props}
			/>
		</DayPickerProvider>
	);
}

Calendar.displayName = "Calendar";

export { Calendar };
