import { supabaseAdmin } from "@/lib/supabaseServer";
import { isAdmin } from "@/lib/verifyAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("pastor_messages")
    .select("id, title, content, description, published_at")
    .order("published_at", { ascending: false });

  if (error) {
    console.log("Error from getPastorMessages function", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to fetch pastor messages" }),
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

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("pastor_messages")
      .insert(body)
      .select()
      .single();

    if (insertError) {
      console.log("Error creating pastor_messages", insertError.message);
      return new Response(
        JSON.stringify({ error: "Failed to create pastor message" }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify(inserted), { status: 201 });
  } catch (err) {
    console.error("POST /api/pastor-message error", err);
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
      .from("pastor_messages")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.log("Failed to update pastor message", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to update pastor message" }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    console.error("PUT /api/pastor-message error", err);
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
      .from("pastor_messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("Failed to delete pastor message", error);
      return new Response(
        JSON.stringify({ error: "Failed to delete pastor message" }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("DELETE /api/pastor-message", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
