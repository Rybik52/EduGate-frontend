"use client";

import { GroupCard } from "@/components/GroupCard";
import { GroupCardProps } from "@/components/GroupCard/types";
import { AnimatedNumber } from "@/components/motion-primitives/animated-number";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { createSwapy } from "swapy";

export default function Home() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const eventSource = new EventSource(
			"http://localhost:1337/api/students-groups/stats/stream"
		);

		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data);
			setGroups(data);
		};

		eventSource.onerror = (error) => {
			console.error("EventSource error:", error);
			eventSource.close();
		};

		return () => {
			eventSource.close();
		};
	}, []);

	useEffect(() => {
		setMounted(true);
	}, []);

	const containerRef = useRef(null);
	const [groups, setGroups] = useState<GroupCardProps[]>([]);

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

	const renderSkeletons = () => {
		return Array.from({ length: 10 }).map((_, index) => (
			<div key={`skeleton-${index}`} className="relative h-full">
				<Card className="h-full">
					<CardHeader>
						<Skeleton className="h-4 w-auto" />
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<Skeleton className="h-4 w-20" />
						</div>
					</CardContent>
				</Card>
			</div>
		));
	};

	return (
		<div ref={containerRef} className="grid grid-cols-6 gap-5 min-h-[50vh]">
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
							<Skeleton className="w-[8rem] h-4" />
						)}
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			</div>

			{groups.length === 0
				? renderSkeletons()
				: groups?.map((group, index) => (
						<div
							key={group.id}
							data-swapy-slot={index}
							className="relative h-full"
						>
							<div
								data-swapy-item={index}
								className="cursor-grab h-full"
							>
								<GroupCard {...group} />
							</div>
						</div>
				  ))}
		</div>
	);
}
