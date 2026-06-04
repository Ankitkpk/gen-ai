import axios from "axios";

export async function register({ username, email, password }) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);

    throw (
      error.response?.data || {
        message: "Something went wrong. Please try again.",
      }
    );
  }
}

export async function login({ email, password }) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);

    throw (
      error.response?.data || {
        message: "Something went wrong. Please try again.",
      }
    );
  }
}

export async function logout() {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);

    throw (
      error.response?.data || {
        message: "Something went wrong. Please try again.",
      }
    );
  }
}

export async function getMe() {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/auth/get-me",
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);

    throw (
      error.response?.data || {
        message: "Something went wrong. Please try again.",
      }
    );
  }
}