import { isAdmin } from "@/lib/verifyAdmin";
import { getSermons } from "@/lib/sermons";

export async function GET() {
  const data = await getSermons();
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req) {
  try {
    // verify admin JWT from cookie
    const payload = await isAdmin(req);
    if (!payload) return new Response(JSON.stringify({ error: "Unauthorized",}),{ status: 401, },);

    const body = await req.json();
    if (!body?.media_url) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    if (!type) {
      return new Response(JSON.stringify({ error: "Missing media type" }), {
        status: 400,
      });
    }

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("sermons")
      .insert({ ...body, type })
      .select()
      .single();

    if (insertError) {
      console.log("Error creating sermons", insertError.message);
      return new Response(
        JSON.stringify({ error: "Failed to create sermons" }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify(inserted), { status: 201 });
  } catch (err) {
    console.error("POST /api/sermons error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
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
      .from("sermons")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.log(`Failed to update sermon: `, updateError);
      return new Response(
        JSON.stringify({ error: "Failed to update sermon" }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    console.log("Unexpected error in PUT /api/sermons", err);
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

    const { error } = await supabaseAdmin.from("sermons").delete().eq("id", id);

    if (error) {
      return new Response(
        JSON.stringify({ error: "Failed to delete sermon" }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.log("Unexpected error in DELETE /api/sermons/detail", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
