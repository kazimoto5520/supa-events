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

export interface Booking {
    rowId: string;
    event: EventResponse;
    user: UserDetailsResponse;
    bookingDate: string; // ISO string (Date in Java)
    paymentDate: string; // ISO string (Date in Java)
    quantity: number;
    totalAmount: string; // BigDecimal as string
    status: string;
    paymentReference: string;
    vendorId: string;
    eventStartDate: string; // ISO string
    eventEndDate: string;   // ISO string
    eventTime: string;
    createdAt: string;
}

export interface EventResponse {
    rowId: string;
    name: string;
    description: string;
    amount: string; // BigDecimal as string
    status: string;
    createdAt: string; // ISO string (Date in Java)
}

export interface UserDetailsResponse {
    rowId: string;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    accountNumber: string;
}

export interface BookingResponse {
    message: string;
    status: string;
    data: Booking[];
}