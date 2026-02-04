import { supabaseAdmin } from "@/lib/supabaseServer";
import { isAdmin } from "@/lib/verifyAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("gallery")
    .select("id, image_url, description, published_at")
    .order("published_at", { ascending: false });

  if (error) {
    console.log("Error from getGallery function", error.message);
    return new Response(JSON.stringify({ error: "Failed to fetch gallery" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req) {
  try {
    // verify admin JWT from cookie
    const payload = await isAdmin(req);
    if (!payload)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });

    // parse multipart form data
    const formData = await req.formData();
    const files = formData.getAll("images");
    if (!files || files.length === 0) {
      return new Response(JSON.stringify({ error: "No files uploaded" }), {
        status: 400,
      });
    }

    const results = [];
    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from("images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        console.log("Error uploading file", uploadError.message);
        continue; // skip failed uploads
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from("images")
        .getPublicUrl(fileName);
      const imageUrl = publicUrlData.publicUrl;

      const { data: inserted, error: insertError } = await supabaseAdmin
        .from("gallery")
        .insert({ image_url: imageUrl })
        .select()
        .single();

      if (!insertError) results.push(inserted);
    }

    return new Response(JSON.stringify(results), { status: 201 });
  } catch (err) {
    console.error("POST /api/gallery error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    // verify admin JWT
    const payload = await isAdmin(req);
    if (!payload)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // find the record to get file path
    const { data: record, error: fetchError } = await supabaseAdmin
      .from("gallery")
      .select("id, image_url")
      .eq("id", id)
      .single();

    if (fetchError || !record) {
      return new Response(JSON.stringify({ error: "Image not found" }), {
        status: 404,
      });
    }

    // extract file name from image_url
    const url = record.image_url;
    const path = url.split("/images/")[1];
    console.log(path);
    await supabaseAdmin.storage.from("images").remove([path]);

    // delete from DB
    const { error } = await supabaseAdmin.from("gallery").delete().eq("id", id);

    if (error) {
      console.log("Failed to delete gallery record", error);
      return new Response(JSON.stringify({ error: "Failed to delete image" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("DELETE /api/gallery error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
