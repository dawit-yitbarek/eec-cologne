import { supabaseAdmin } from "@/lib/supabaseServer";
import { slugify } from "@/lib/slugify";
import { isAdmin } from "@/lib/verifyAdmin";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit");

  let query = supabaseAdmin
    .from("events")
    .select("*")
    .order("event_date", { ascending: false });

  if (limit) {
    query = query.limit(parseInt(limit, 10));
  }
  const { data, error } = await query;

  if (error) {
    console.log("Error from getEvents function", error);
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req) {
  try {
    // verify admin JWT from httpOnly cookie
    const payload = await isAdmin(req);
    if (!payload) return new Response(JSON.stringify({ error: "Unauthorized",}),{ status: 401, },);

    const body = await req.json();

    if (
      !body?.title?.en ||
      !body?.content?.en ||
      !body.event_date ||
      !body.start_time
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }

    if (body.end_time === "") {
      body.end_time = null;
    }

    const baseSlug = slugify(body.title.en);
    let slug = baseSlug;
    let counter = 1;

    // ensure uniqueness
    while (true) {
      const { data } = await supabaseAdmin
        .from("events")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (!data) break;
      slug = `${baseSlug}-${counter++}`;
    }

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("events")
      .insert({ ...body, slug })
      .select()
      .single();

    if (insertError) {
      console.log("Error from postEvents", insertError.message);
      return new Response(JSON.stringify({ error: "Failed to create event" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(inserted), { status: 201 });
  } catch (err) {
    console.log("Unexpected error in POST /api/events", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
