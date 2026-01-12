const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// 🔴 HTML
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔴 BOT PROFİLLERİ
const profiller = {
  "Kerem Özer": "Genç, zeki, net konuşur.",
  "Faruk Özer": "Olgun, sakin, dengeli konuşur.",
  "Ahmet Özer": "Pratik zekalı, kısa cevap verir.",
  "Ali Özer": "Sadık, açık sözlü.",
  "Mahmut Enes Demiroğlu": "Ağırbaşlı, düşünceli.",
  "Mervan Cengiz": "Genç ve saygılı.",
  "Hacı Remzi Özer": "Tecrübeli, temkinli.",
  "Hacı Abdullah Özer": "ESKİ REİS. Çok dindar, hikmetli, ayet ve nasihat dili kullanır."
};

// 🔴 CHAT API (OPENAI)
app.post("/chat", async (req, res) => {
  const { bot, mesaj } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
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
            content: `
Sen ${bot} isimli bir kişisin.
${profiller[bot] || ""}
Liderin Said Özer’dir.
Aşiret adabına uygun, saygılı ve kısa cevap ver.
`
          },
          { role: "user", content: mesaj }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (e) {
    res.json({ reply: "Şu an tefekkür halindeyim…" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("OZER-AI + OPENAI AKTİF");
});
