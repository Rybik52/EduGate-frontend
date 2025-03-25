import { FC, useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { GroupCardProps } from "./types";
import { AnimatedNumber } from "../motion-primitives/animated-number";
import { useInView } from "motion/react";

export const GroupCard: FC<GroupCardProps> = ({
	totalCount,
	count,
	isOnline,
	name,
	lastUpdateTimestamp,
}) => {
	const ref = useRef(null);
	const isInView = useInView(ref);
	const [animatedCount, setAnimatedCount] = useState(0);

	useEffect(() => {
		if (isInView) {
			setAnimatedCount(count);
		}
	}, [isInView, count]);

	return (
		<Card
			className="text-xl flex flex-col justify-between h-full"
			ref={ref}
		>
			<CardHeader>
				<div className="flex gap-2 flex-col">
					<div className="flex gap-2 items-center">
						<p>{name}</p>
						{isOnline ? (
							<div className="rounded-full size-2 bg-green-400" />
						) : (
							<div className="rounded-full size-2 bg-red-400" />
						)}
					</div>

					{lastUpdateTimestamp && !isOnline && (
						<div className="text-xs text-[#929292] h-6">
							Посл. обновление в{" "}
							{new Date(lastUpdateTimestamp).getHours()}:
							{new Date(lastUpdateTimestamp)
								.getMinutes()
								.toString()
								.padStart(2, "0")}
						</div>
					)}
				</div>
			</CardHeader>

			<CardContent className="flex-1 flex items-end">
				<div>
					<AnimatedNumber
						className="inline-flex items-center text-4xl"
						springOptions={{
							bounce: 0.1,
							duration: 2000,
						}}
						value={animatedCount}
					/>

					<span className="text-xl text-[#929292]">
						/{totalCount}
					</span>
				</div>
			</CardContent>
		</Card>
	);
};
