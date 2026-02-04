import { supabaseAdmin } from "@/lib/supabaseServer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function serializeCookie(name, value, opts = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  if (opts.maxAge) parts.push(`Max-Age=${opts.maxAge}`);
  if (opts.domain) parts.push(`Domain=${opts.domain}`);
  if (opts.path) parts.push(`Path=${opts.path}`);
  if (opts.httpOnly) parts.push(`HttpOnly`);
  if (opts.secure) parts.push(`Secure`);
  if (opts.sameSite) parts.push(`SameSite=${opts.sameSite}`);
  return parts.join("; ");
}

export async function POST(req) {
  const { password } = await req.json();

  if (!password) {
    return new Response(JSON.stringify({ error: "Missing password" }), { status: 400 });
  }

  try {
    const { data: admin, error } = await supabaseAdmin
      .from("admins")
      .select("*")
      .single();

    if (error || !admin) {
      return new Response(JSON.stringify({ error: "Invalid password" }), { status: 401 });
    }

    // Compare password
    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) {
      return new Response(JSON.stringify({ error: "Incorrect password" }), { status: 401 });
    }

    // Create JWT (expires in 1 day)
    const token = jwt.sign(
      { adminId: admin.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie options (1 day)
    const maxAge = 24 * 60 * 60; // 1 day
    const secure = process.env.NODE_ENV === "production";

    const cookie = serializeCookie("admin_token", token, {
      httpOnly: true,
      secure,
      sameSite: "Strict",
      path: "/",
      maxAge,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Login error:", err.message);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
