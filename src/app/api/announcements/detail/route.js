import { supabaseAdmin } from "@/lib/supabaseServer";
import { isAdmin } from "@/lib/verifyAdmin";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  const { data, error } = await supabaseAdmin
    .from("announcements")
    .select("slug, title, content, description, published_at")
    .eq("slug", slug);
  if (error) {
    console.log(
      "Error from getAnnouncement function with slug:",
      slug,
      error.message,
    );
    return new Response(
      JSON.stringify({ error: "Failed to fetch announcement" }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function PUT(req) {
  try {
    // verify admin JWT from cookie
    const payload = await isAdmin(req);
    if (!payload) return new Response(JSON.stringify({ error: "Unauthorized",}),{ status: 401, },);

    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const { data: updated, error: updateError } = await supabaseAdmin
      .from("announcements")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.log("Failed to update announcement", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to update announcement" }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    console.error("PUT /api/announcements/detail error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    // verify admin JWT from cookie
    const payload = await isAdmin(req);
    if (!payload) return new Response(JSON.stringify({ error: "Unauthorized",}),{ status: 401, },);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const { error } = await supabaseAdmin
      .from("announcements")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("Failed to delete announcement", error);
      return new Response(
        JSON.stringify({ error: "Failed to delete announcement" }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("DELETE /api/announcements/detail error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
