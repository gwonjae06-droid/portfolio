// Vercel 서버리스 함수 — Upstage Chat Completions API 프록시

export default async function handler(req, res) {
  // POST만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.UPSTAGE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const response = await fetch('https://api.upstage.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + apiKey,
      },
      body: JSON.stringify({
        model: 'solar-pro3',
        messages,
      }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
