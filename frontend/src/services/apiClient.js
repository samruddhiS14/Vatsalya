const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

async function request(endpoint, options = {}) {

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const contentType =
    response.headers.get("content-type") || "";

  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(
      typeof data === "string"
        ? data
        : data?.message ||
          `Request failed with status ${response.status}`
    );
  }

  return data;
}

export const api = {

  get: (endpoint) =>
    request(endpoint, {
      method: "GET"
    }),

  post: (endpoint, body) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(body)
    }),

  put: (endpoint, body) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body)
    }),

  patch: (endpoint, body = null) =>
    request(endpoint, {
      method: "PATCH",
      ...(body !== null
        ? { body: JSON.stringify(body) }
        : {})
    }),

  delete: (endpoint) =>
    request(endpoint, {
      method: "DELETE"
    })
};
