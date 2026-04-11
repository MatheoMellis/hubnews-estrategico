export default async function handler(req, res) {
  // Permitir chamadas do browser (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { q, apikey } = req.query;

  if (!q || !apikey) {
    return res.status(400).json({ error: 'Parâmetros q e apikey são obrigatórios.' });
  }

  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=pt&country=br&max=9&apikey=${apikey}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar notícias.' });
  }
}
