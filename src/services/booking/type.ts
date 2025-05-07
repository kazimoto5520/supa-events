export interface BookingRequest {
    eventId: string;
    userId?: string;
    bookingDate?: Date;
    paymentDate?: Date;
    quantity?: number;
    totalAmount: number;
    status?: string;
    paymentReference?: string;
    vendorId?: string;
    eventStartDate: Date;
    eventEndDate: Date;
    eventTime: string;
}

export interface CreateBookingResponse {
    message: string;
    status: string;
}