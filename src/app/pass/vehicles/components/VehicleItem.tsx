import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Vehicle } from "../types";
import { Badge } from "@/components/ui/badge";
import { Car } from "lucide-react";

interface VehicleItemProps {
    vehicle: Vehicle;
}

const statusStyles = {
    active: "bg-[#CDEFD7] text-[#2BA24C]",
    expired: "bg-[#FFD9DB] text-[#FB444B]",
    pending: "bg-[#FFF4DE] text-[#F9A826]",
};

export function VehicleItem({ vehicle }: VehicleItemProps) {
    const formatDate = (date: string) => {
        return format(new Date(date), "d MMMM yyyy", { locale: ru });
    };

    return (
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-full">
                    <Car className="w-6 h-6 text-[#448EFD]" />
                </div>
                <div>
                    <h4 className="font-medium">{vehicle.plateNumber}</h4>
                    <p className="text-sm text-gray-500">{vehicle.owner.name}</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Badge variant="outline" className="bg-[#D7E7FF] text-[#448EFD] border-none">
                    {vehicle.location}
                </Badge>
                <div className="text-sm text-gray-500">
                    {formatDate(vehicle.validFrom)} - {formatDate(vehicle.validUntil)}
                </div>
                <Badge className={statusStyles[vehicle.status]}>
                    {vehicle.status === "active" && "Активен"}
                    {vehicle.status === "expired" && "Просрочен"}
                    {vehicle.status === "pending" && "На рассмотрении"}
                </Badge>
            </div>
        </div>
    );
}