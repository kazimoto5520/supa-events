export interface Booking {
    id: number;
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
    event: string;
    date: string;
    status: string;
    paymentStatus: string;
    amount?: number;
    paymentDate?: string;
    notes?: string;
}
