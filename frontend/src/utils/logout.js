import api from "./api";

export default async function logout() {
  try {
    await api.post("/user/logout");
    window.location.href = "/auth/login";
  } catch (err) {
    console.error("Logout failed:", err);
  }
}
