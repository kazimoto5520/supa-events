export interface RegisterRequest {
    email: string;
    password: string;
    accountType: string;
    customerType: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface OtpRequest {
    pin: string;
    pin_id: string | undefined;
    phone_number: string;
}

export interface JwtClaims {
    role: Role[];
    sub: string; // Email or user ID
    iat: number; // Issued at (timestamp)
    exp: number; // Expiration (timestamp)
}

export interface Role {
    role: string;
    permissions: string[];
}

export interface UserDetailsResponse {
    rowId: string;
    username: string;
    firstName: string;
    middleName?: string; // Optional field
    lastName: string;
    email: string;
    phoneNumber: string;
    accountType: string;
    customerType: string;
    accountNumber: string;
    dateOfBirth: string; // Format: "YYYY-MM-DD"
    gender: string;
    nidaNumber: string;
    photoUrl?: string; // Optional field
    businessName?: string; // Optional field
    businessEmail?: string; // Optional field
    businessAddress?: string; // Optional field
    businessLicenseUrl?: string; // Optional field
    tinCertificateUrl?: string; // Optional field
    taxClearanceUrl?: string; // Optional field
    roleCompany: string;
    status: string;
    approved: boolean;
    roles: Role[];
    permissions: string[];
    firstLogin: boolean;
    bankAccount: string;
}

export interface AuthResponse {
    [x: string]: any;
    token: string;
    response: any;
    message: string | null;
    output: RegisterRequest | LoginRequest | null;
    data: {
        user: UserDetailsResponse;
        notificationToken: string;
        accessToken: string;
        expirationTime: string;
        claims: JwtClaims;
    }
}
export interface ApiError {
    response: {
        data: {
            validationErrors?: string[];
            errorDescription?: string;
            error?: string;
            message?: string;
        }
    }
}