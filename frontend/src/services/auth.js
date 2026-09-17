import {
  setCurrentUser,
  saveUser as storeUser
} from "./session";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export async function loginUser(email, password) {

  const response = await fetch(
    `${API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }
  );

  const data =
    await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      typeof data === "string"
        ? data
        : data?.message ||
          "Invalid email or password"
    );
  }

  return data;
}

export function saveUser(user) {
  setCurrentUser(user);
}

export async function registerUser(userData) {

  const response = await fetch(
    `${API_BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }
  );

  const data =
    await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      typeof data === "string"
        ? data
        : data?.message ||
          "Registration failed"
    );
  }

  return data;
}
