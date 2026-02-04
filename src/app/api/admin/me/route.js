import { isAdmin } from "@/lib/verifyAdmin";

export async function GET(req) {
  try {
    const payload = await isAdmin(req);
    if (!payload)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });

    return new Response(JSON.stringify({ admin: true }), { status: 200 });
  } catch (err) {
    console.error("/api/admin/me error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
