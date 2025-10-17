// src/services/api.js
const BASE_URL = "http://185.215.150.198:5000";

export const apiRequest = async (
  endpoint,
  method = "GET",
  body = null,
  token = null
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await response.json();
  return data;
};
