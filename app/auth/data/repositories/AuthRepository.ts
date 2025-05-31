import { AuthUseCase } from "../../domain/usecase/auth_use_case";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from "../../domain/models/auth";
import { loginService, registerService, getUserService } from "../../infrastrucute/AuthServices";

export class AuthRepository implements AuthUseCase {
    async login(request: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await loginService(request);
            return response;
        } catch (error) {
            throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async register(request: RegisterRequest): Promise<RegisterResponse> {
        try {
            const response = await registerService(request);
            return response;
        } catch (error) {
            throw new Error(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async getUser(): Promise<User[]> {
        try {
            const users = await getUserService();
            return users;
        } catch (error) {
            throw new Error(`Failed to fetch users: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}
