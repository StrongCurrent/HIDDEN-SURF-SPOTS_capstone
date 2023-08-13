export default async function handler(req, res) {
  if (req.method === "GET") {
    const API_URL = process.env.WEATHER_API_MARINE_URL;
    const API_KEY = process.env.WEATHER_API_KEY;
    const query = req.query.q;

    const api_url = `${API_URL}?key=${API_KEY}&q=${query}`;

    try {
      const response = await fetch(api_url);

      if (!response.ok) {
        throw new Error("API RESPONSE NOT OK");
      }

      const data = await response.json();

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "FAILED TO FETCH THE DATA." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
