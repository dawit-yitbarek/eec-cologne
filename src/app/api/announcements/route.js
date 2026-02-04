import { supabaseAdmin } from "@/lib/supabaseServer";
import { slugify } from "@/lib/slugify";
import { isAdmin } from "@/lib/verifyAdmin";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit");

  let query = supabaseAdmin
    .from("announcements")
    .select("*")
    .order("published_at", { ascending: false });

  if (limit) {
    query = query.limit(parseInt(limit, 10));
  }
  const { data, error } = await query;

  if (error) {
    console.log("Error from getAnnouncements function", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch announcements" }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req) {
  try {
    // verify admin JWT from cookie
    const payload = await isAdmin(req);
    if (!payload) return new Response(JSON.stringify({ error: "Unauthorized",}),{ status: 401, },);

    const body = await req.json();
    if (
      !body?.title["en"] ||
      !body?.content["en"] ||
      !body?.title["de"] ||
      !body?.content["de"] ||
      !body?.title["am"] ||
      !body?.content["am"]
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }

    const baseSlug = slugify(body.title["en"]);
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const { data } = await supabaseAdmin
        .from("announcements")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (!data) break;
      slug = `${baseSlug}-${counter++}`;
    }

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("announcements")
      .insert({ ...body, slug })
      .select()
      .single();

    if (insertError) {
      console.log("Error creating announcement", insertError.message);
      return new Response(
        JSON.stringify({ error: "Failed to create announcement" }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify(inserted), { status: 201 });
  } catch (err) {
    console.error("POST /api/announcements error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
