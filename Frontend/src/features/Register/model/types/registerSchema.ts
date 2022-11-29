export interface RegisterSchema {
    username:string;
    password:string;
    confirmPassword:string;
    isLoading:boolean;
    error?:string;
}
