import jwt from "jsonwebtoken";

export async function isAdmin(req) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.split("; ").find((c) => c.startsWith("admin_token="));
  const token = match ? decodeURIComponent(match.split("=")[1]) : null;

  if (!token) return false;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return !!payload?.adminId;
  } catch (err) {
    console.log("Failed to authenticate admin")
    return false;
  }
}
