"use client";

import { GroupCard } from "@/components/GroupCard";
import { GroupCardProps } from "@/components/GroupCard/types";
import { AnimatedNumber } from "@/components/motion-primitives/animated-number";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useInView } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { createSwapy } from "swapy";

const INITIAL_GROUPS: GroupCardProps[] = [
	{ name: "Группа 1ВД1", count: 2, totalCount: 27, isOnline: true },
	{
		name: "Группа 1ВД2",
		count: 2,
		totalCount: 21,
		isOnline: false,
		lastUpdateTimestamp: Date.now(),
	},
	{ name: "Группа 1ВД3", count: 2, totalCount: 25, isOnline: true },
	{ name: "Группа 1ВД4", count: 2, totalCount: 27, isOnline: true },
	{ name: "Группа 2ВД1", count: 22, totalCount: 24, isOnline: true },
	{ name: "Группа 2ВД2", count: 12, totalCount: 27, isOnline: true },
	{ name: "Группа 2ВД2", count: 12, totalCount: 27, isOnline: true },
	{ name: "Группа 2ВД2", count: 12, totalCount: 27, isOnline: true },
	{ name: "Группа 2ВД2", count: 12, totalCount: 27, isOnline: true },
	{ name: "Группа 2ВД2", count: 12, totalCount: 27, isOnline: true },
];

export default function Home() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const containerRef = useRef(null);
	const [groups, setGroups] = useState(INITIAL_GROUPS);

	const [value, setValue] = useState(0);
	const ref = useRef(null);
	const isInView = useInView(ref);

	if (isInView && value === 0) {
		setValue(10000);
	}

	useEffect(() => {
		if (!containerRef.current) return;

		const swapy = createSwapy(containerRef.current);

		return () => {
			swapy.destroy();
		};
	}, [groups]);

	return (
		<div
			ref={containerRef}
			className="grid grid-cols-6 gap-5 min-h-[50vh] grid-auto-rows-[1fr]"
		>
			<div className="col-span-2 row-span-2">
				<Card ref={ref} className="h-full">
					<CardHeader>
						{mounted ? (
							<AnimatedNumber
								className="inline-flex items-center text-2xl"
								springOptions={{ bounce: 0.1, duration: 10000 }}
								value={value}
							/>
						) : (
							<span>{value}</span>
						)}
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			</div>

			{groups.map((group, index) => (
				<div
					key={index}
					data-swapy-slot={index}
					className="relative h-full"
				>
					<div data-swapy-item={index} className="cursor-grab h-full">
						<GroupCard {...group} />
					</div>
				</div>
			))}
		</div>
	);
}
