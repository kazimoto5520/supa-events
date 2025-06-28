export interface Event {
    rowId: string;
    name: string;
    description: string;
    amount: number;
    user: UserDetailsResponse;
    category: CategoryResponse;
    status: string;
    createdAt: string;
}

export interface UserDetailsResponse {
    rowId: string;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export interface CategoryResponse {
    name: string;
    ref: string;
}

export interface EventResponse {
    data: Event[];
    message: string;
    status: string;
}  

export interface EventRequest {
    name: string;
    description: string;
    amount: number;
    category: string;
}
