"use client";

import { GroupCard } from "@/components/GroupCard";
import { GroupCardProps } from "@/components/GroupCard/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useRef, useEffect } from "react";
import { createSwapy } from "swapy";

export default function Home() {
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

	const containerRef = useRef(null);
	const [groups, setGroups] = useState<GroupCardProps[]>([]);

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
			{groups.length === 0
				? renderSkeletons()
				: groups?.map((group, index) => (
						<div
							key={group.id}
							data-swapy-slot={index}
							className="relative h-full cursor-grab"
						>
							<div data-swapy-item={index} className=" h-full">
								<GroupCard {...group} />
							</div>
						</div>
				  ))}
		</div>
	);
}
