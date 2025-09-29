export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: "customer" | "seller" | "admin";
}

export interface SignupResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: "customer" | "seller" | "admin";
  status: "pending" | "approved" | "rejected" | "suspended";
  emailVerified: boolean;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: "customer" | "seller" | "admin";
  status: "pending" | "approved" | "rejected" | "suspended";
  emailVerified: boolean;
  createdAt: string;
  token?: string;
}

export interface LogoutRequest {
  userId?: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
  loggedOutAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: "customer" | "seller" | "admin";
  status: "pending" | "approved" | "rejected" | "suspended";
  emailVerified: boolean;
  createdAt: string;
}
