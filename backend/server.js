const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Keine URL angegeben!" });

    const command = `yt-dlp -g ${url}`;

    exec(command, (error, stdout) => {
        if (error) {
            return res.status(500).json({ error: "Fehler beim Abrufen des Links!" });
        }
        res.json({ downloadUrl: stdout.trim() });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend läuft auf Port ${PORT}`));
