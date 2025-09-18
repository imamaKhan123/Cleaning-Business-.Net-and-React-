// services/authService.ts

const API_URL = "http://localhost:5102/api/Auth";

// 🔹 Types
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
export interface AppUser {
    id: string;
    name: string;

    email: string;
    role: string;
  }


// 🔹 Register user
export const registerUser = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include" 
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
};

// 🔹 Login user
export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

// 🔹 Logout helper (just clear storage)
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("auth");
};
// 🔹 Save auth info
export const saveAuth = (auth: AuthResponse) => {
  localStorage.setItem("token", auth.token);
  localStorage.setItem("auth", JSON.stringify(auth));
};

export function clearAuth() {
  localStorage.removeItem("auth");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getAuth(): AuthResponse | null {
  const stored = localStorage.getItem("auth");
  return stored ? JSON.parse(stored) : null;
}

// 🔹 Get current user
export const getCurrentUser = (): AppUser | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// 🔹 Get token
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};
