import { supabaseAdmin } from "@/lib/supabaseServer";
import { isAdmin } from "@/lib/verifyAdmin";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  const { data, error } = await supabaseAdmin
    .from("events")
    .select(
      "slug, title, content, description, event_date, start_time, end_time, location",
    )
    .eq("slug", slug);
  if (error) {
    console.log("Error from getEvent function with slug:", slug, error.message);
    return new Response(JSON.stringify({ error: "Failed to fetch event" }), {
      status: 500,
    });
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

    if (body.end_time === "") {
      body.end_time = null;
    }

    const { data: updated, error: updateError } = await supabaseAdmin
      .from("events")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.log(`Failed to update events: `, updateError);
      return new Response(JSON.stringify({ error: "Failed to update event" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    console.log("Unexpected error in PUT /api/events/detail", err);
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

    const { error } = await supabaseAdmin.from("events").delete().eq("id", id);

    if (error) {
      return new Response(JSON.stringify({ error: "Failed to delete event" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.log("Unexpected error in DELETE /api/events/detail", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
