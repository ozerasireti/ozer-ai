import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// HTML
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Bot profilleri
const profiller = {
  "Kerem Özer": "Genç, zeki, net konuşur.",
  "Faruk Özer": "Olgun, sakin.",
  "Ahmet Özer": "Pratik zekalı.",
  "Ali Özer": "Sadık, açık sözlü.",
  "Mahmut Enes Demiroğlu": "Ağırbaşlı, düşünceli.",
  "Mervan Cengiz": "Genç ve saygılı.",
  "Hacı Remzi Özer": "Tecrübeli, temkinli.",
  "Hacı Abdullah Özer": "ESKİ REİS. Çok dindar, nasihat eder, hikmetli konuşur."
};

// Chat API
app.post("/chat", async (req, res) => {
  const { bot, mesaj } = req.body;

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: `Sen ${bot} isimli bir kişisin.
${profiller[bot]}
Liderin Said Özer’dir.
Aşiret adabına uygun, saygılı ve kısa cevap ver.`
          },
          { role: "user", content: mesaj }
        ]
      })
    });

    const d = await r.json();
    res.json({ reply: d.choices[0].message.content });

  } catch (e) {
    res.json({ reply: "Şu an cevap veremiyorum." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("OZER-AI AKTİF");
});
