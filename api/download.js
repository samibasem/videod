// api/download.js
const fetch = require('node-fetch');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "Keine URL angegeben!" });
        }

        // API-URL von Vevioz, die den Download-Link zurückgibt
        const apiUrl = `https://api.vevioz.com/api/button/mp4?url=${encodeURIComponent(url)}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.url) {
                return res.status(200).json({ downloadUrl: data.url });
            } else {
                return res.status(400).json({ error: "Kein Video gefunden!" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Fehler beim Abrufen des Links!" });
        }
    } else {
        res.status(405).json({ error: "Nur POST-Anfragen erlaubt" });
    }
}
