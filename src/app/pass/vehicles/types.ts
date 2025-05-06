export interface Vehicle {
    id: number;
    plateNumber: string;
    validFrom: string;
    validUntil: string;
    location: string;
    owner: {
        id: number;
        name: string;
    };
    status: "active" | "expired" | "pending";
}