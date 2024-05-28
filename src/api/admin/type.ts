export interface LoginForm {
    username: string;
    password: string;
}

export interface response {
    code: number;
    message: string;
    data: any;
}

export interface loginResponseData {
    code: number;
    data: any;
}
