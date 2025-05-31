import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User, UserResponse } from "../domain/models/auth";

const API_URL = "https://interview-coach-backend-production.up.railway.app/api/v1";

const defaultHeaders = {
  "Content-Type": "application/json",
//   "Accept": "application/json",
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

export const loginService = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: defaultHeaders,
    credentials: "include",
    body: JSON.stringify({
      email: data.email,
      password: data.password
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Login failed: ${error}`);
  }

  const json = await res.json();
  return {
    message: json.message,
    token: json.token
  } as LoginResponse;
};

export const registerService = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: defaultHeaders,
        credentials: "include",
        body: JSON.stringify({
            email: data.email,
            password: data.password,
            username: data.username
        }),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Register failed: ${error}`);
    }

    const json = await res.json();
    return {
        error: json.error,
        successResponse: json.successResponse,
        errorMessage: json.errorMessage,
        successMessage: json.successMessage
    } as RegisterResponse;
}

export const getUserService = async (): Promise<User[]> => {
    const res = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: defaultHeaders,
        credentials: "include",
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Get user failed: ${error}`);
    }

    const json = await res.json() as UserResponse;
    
    if (json.error) {
        throw new Error(json.errorMessage || 'Failed to fetch users');
    }

    return json.data;
}
