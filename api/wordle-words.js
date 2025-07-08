export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.frontendexpert.io/api/fe/wordle-words");
    const data = await response.json();
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    return res.status(200).json(data);
  } catch (err) {
    console.error("API fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch word list" });
  }
}
