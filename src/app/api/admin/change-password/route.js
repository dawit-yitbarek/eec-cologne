import { isAdmin } from "@/lib/verifyAdmin";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(req) {
  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return new Response(JSON.stringify({ error: "Missing password" }), {
      status: 400,
    });
  }

  try {
    const payload = await isAdmin(req);
    if (!payload)
      return new Response(
        JSON.stringify({
          error: "You don't have permission to change password",
        }),
        {
          status: 401,
        },
      );

    const { data: admin, error } = await supabaseAdmin
      .from("admins")
      .select("*")
      .single();

    if (error || !admin) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
      });
    }

    // Compare password
    const match = await bcrypt.compare(currentPassword, admin.password_hash);
    if (!match) {
      return new Response(JSON.stringify({ error: "Incorrect current password" }), {
        status: 401,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await supabaseAdmin
      .from("admins")
      .update({ password_hash: hashedPassword, changed_at: new Date() })
      .eq("id", admin.id)
      .single();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error("change password error:", err.message);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
