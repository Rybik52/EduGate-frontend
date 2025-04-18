export interface AttendanceRecord {
    date: string;
    entries: {
        entry: string;
        exit: string | null;
    }[];
}

export interface AttendanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    attendance: AttendanceRecord | null;
}