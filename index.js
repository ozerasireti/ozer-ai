import express from "express";
import fetch from "node-fetch";
import cors from "cors";
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

/* ANA SAYFA */
app.get("/", (req, res) => {
  res.send("OZER-AI API ÇALIŞIYOR");
});

/* CHAT */
app.post("/chat", async (req, res) => {
  const { bot, mesaj } = req.body;

  res.json({
    reply: `${bot} dedi ki: ${mesaj}`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server ayakta: " + PORT);
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API çalışıyor");
});

app.post("/chat", async (req, res) => {
  const { bot, mesaj } = req.body;

  if (!bot || !mesaj) {
    return res.json({ reply: "Eksik veri" });
  }

  const profil = {
    "Kerem Özer": "Genç, net konuşur.",
    "Faruk Özer": "Olgun, sakin.",
    "Ahmet Özer": "Pratik zekalı.",
    "Ali Özer": "Sadık ve açık sözlü.",
    "Mahmut Enes Demiroğlu": "Ağırbaşlı.",
    "Mervan Cengiz": "Genç ve saygılı.",
    "Hacı Remzi Özer": "Tecrübeli.",
    "Hacı Abdullah Özer": "Eski reis. Çok dindar, nasihat eder."
  };

  const sys = `
Sen ${bot}'sun.
${profil[bot] || ""}
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
          { role: "system", content: sys },
          { role: "user", content: mesaj }
        ]
      })
    });

    const j = await r.json();
    res.json({ reply: j.choices?.[0]?.message?.content || "Cevap yok" });
  } catch (e) {
    res.json({ reply: "Sunucu hatası" });
  }
});

app.listen(3000, () => console.log("API çalışıyor"));
