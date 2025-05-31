import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from "../models/auth"

export interface AuthUseCase {
    login(request: LoginRequest): Promise<LoginResponse>;
    register(request: RegisterRequest): Promise<RegisterResponse>
    getUser(): Promise<User[]>
}
