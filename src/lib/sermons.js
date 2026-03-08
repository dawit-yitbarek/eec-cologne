import { supabaseAdmin } from "@/lib/supabaseServer";

export async function getSermons() {
  const { data, error } = await supabaseAdmin
    .from("sermons")
    .select("id, description, type, media_url, published_at")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching sermons", error);
    return [];
  }

  return data ?? [];
}
