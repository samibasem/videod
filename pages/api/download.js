// api/download.js (für Next.js oder ein anderes Node.js-Backend)

const { exec } = require("child_process");

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "Keine URL angegeben!" });
        }

        // Führe yt-dlp mit der URL aus, um den direkten Download-Link zu erhalten
        const command = `yt-dlp -g ${url}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Fehler: ${error.message}`);
                return res.status(500).json({ error: "Fehler beim Abrufen des Links!" });
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return res.status(500).json({ error: "Fehler beim Abrufen des Links!" });
            }

            // Entferne unerwünschte Leerzeichen oder Zeilenumbrüche
            const downloadUrl = stdout.trim();
            if (downloadUrl) {
                return res.status(200).json({ downloadUrl });
            } else {
                return res.status(500).json({ error: "Kein Download-Link gefunden!" });
            }
        });
    } else {
        res.status(405).json({ error: "Nur POST-Anfragen erlaubt" });
    }
}
