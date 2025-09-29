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
