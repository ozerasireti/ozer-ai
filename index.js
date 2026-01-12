import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PROFIL = {
  "Kerem Özer":"Genç, zeki, net konuşur.",
  "Faruk Özer":"Olgun, sakin.",
  "Ahmet Özer":"Pratik zekalı.",
  "Ali Özer":"Sadık, açık sözlü.",
  "Mahmut Enes Demiroğlu":"Ağırbaşlı, düşünceli.",
  "Mervan Cengiz":"Genç ve saygılı.",
  "Hacı Remzi Özer":"Tecrübeli, temkinli.",
  "Hacı Abdullah Özer":"ESKİ REİS. Çok dindar, nasihat eder, hikmetli konuşur."
};

app.post("/api", async (req, res) => {
  const { bot, mesaj } = req.body;

  const system = `
Sen ${bot}'sun.
${PROFIL[bot] || ""}
Liderin Said Özer’dir.
Aşiret adabına uygun, kısa ve saygılı cevap ver.
`;

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: system },
          { role: "user", content: mesaj }
        ]
      })
    });

    const j = await r.json();
    res.json({ reply: j.choices?.[0]?.message?.content || "..." });
  } catch (e) {
    res.json({ reply: "Şu an cevap veremiyorum." });
  }
});

app.listen(3000, () => console.log("API çalışıyor"));
