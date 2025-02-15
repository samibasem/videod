export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "Keine URL angegeben!" });
        }

        // Benutze die 9xbuddy API oder eine ähnliche Quelle
        const apiUrl = `https://9xbuddy.com/api?url=${encodeURIComponent(url)}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data && data.videoUrl) {
                return res.status(200).json({ downloadUrl: data.videoUrl });
            } else {
                return res.status(500).json({ error: "Fehler beim Abrufen des Links!" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Fehler bei der Verbindung mit der API!" });
        }

    } else {
        res.status(405).json({ error: "Nur POST-Anfragen erlaubt" });
    }
}
