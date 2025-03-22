export interface UserRegisterAuth {
    name: string;
    location: string;
    email: string;
    phone_number: string;
    password: string;
}

export interface UserLoginAuth {
    email: string;
    password: string;
}

export interface OtpRequest {
    pin: string;
    pin_id: string | undefined;
    phone_number: string;
}

export interface Response {
    [x: string]: any;
    token: string;
    response: any;
    message: string | null;
    output: UserRegisterAuth | UserLoginAuth | null;
}