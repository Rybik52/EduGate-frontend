import Link from "next/link";
import Image from "next/image";
import CarPic from "@/assets/illustrations/car.png";
import GuestPic from "@/assets/illustrations/guest.png";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardDescription,
} from "@/components/ui/card";
import { ChevronRightIcon } from "lucide-react";

const PAGE_CARDS = [
	{
		title: "Транспорт",
		description: "Создать пропуск на транспорт",
		imageSrc: CarPic,
		alt: "Изображение авто",
		link: "/pass/vehicles",
	},
	{
		title: "Гости",
		description: "Создать пропуск для гостя",
		imageSrc: GuestPic,
		alt: "Изображение гостя",
		link: "/pass/guests",
	},
];

export default function Pass() {
	return (
		<div className="grid grid-cols-2   gap-8 ">
			{PAGE_CARDS.map((card) => (
				<Link
					key={card.link}
					href={card.link}
					className="transition-opacity ease-in-out hover:opacity-70 group"
				>
					<Card
						key={card.title}
						className="flex justify-between p-4 overflow-hidden"
					>
						<div className="flex items-center gap-4">
							<Image
								className="w-36 h-36 object-cover scale-[1.25] "
								src={card.imageSrc}
								alt={card.alt}
							/>

							<CardContent className="flex flex-col justify-center p-0">
								<CardHeader className="p-0 text-5xl font-medium">
									{card.title}
								</CardHeader>
								<CardDescription className="text-xl mt-1">
									{card.description}
								</CardDescription>
							</CardContent>
						</div>

						<Button className="rounded-full w-20 h-20 bg-[#F6F6F6] self-center transition-colors group-hover:bg-gray-300">
							<ChevronRightIcon
								className="stroke-black"
								style={{ width: "2.5rem", height: "2.5rem" }}
							/>
						</Button>
					</Card>
				</Link>
			))}
		</div>
	);
}
