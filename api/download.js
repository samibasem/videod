const { exec } = require("child_process");

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "Keine URL angegeben!" });
        }

        const command = `yt-dlp -g ${url}`;
        exec(command, (error, stdout) => {
            if (error) {
                return res.status(500).json({ error: "Fehler beim Abrufen des Links!" });
            }
            res.status(200).json({ downloadUrl: stdout.trim() });
        });
    } else {
        res.status(405).json({ error: "Nur POST-Anfragen erlaubt" });
    }
}
