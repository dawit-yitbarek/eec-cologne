const normalize = (d) => {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date;
};

export async function fetchContent(
  path,
  setContent,
  setLoading,
  setError,
  limit,
) {
  setLoading(true);
  setError(false);

  try {
    const res = await fetch(`/api/${path}?limit=${limit ?? ""}`);

    if (!res.ok) {
      setError(true);
      throw new Error(`Failed to fetch ${path}`);
    }

    const data = await res.json();

    if (path === "events") {
      const now = normalize(new Date());

      const upcoming = data
        .filter((e) => normalize(e.event_date) >= now)
        .sort((a, b) => normalize(a.event_date) - normalize(b.event_date));

      const past = data
        .filter((e) => normalize(e.event_date) < now)
        .sort((a, b) => normalize(b.event_date) - normalize(a.event_date));

      setContent([...upcoming, ...past]);
      return;
    }

    setContent(data);
  } catch (error) {
    // In production builds, avoid writing to console unless needed for debugging
    setError(true);
  } finally {
    setLoading(false);
  }
}
