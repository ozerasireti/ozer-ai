const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // HTML buradan servis edilecek

/* ANA SAYFA */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

/* BOT PROFİLLERİ */
const profil = {
  "Kerem Özer": "Genç, zeki, net konuşur.",
  "Faruk Özer": "Olgun, sakin ve ağırbaşlı.",
  "Ahmet Özer": "Pratik zekalı, çözüm odaklı.",
  "Ali Özer": "Sadık, açık sözlü.",
  "Mahmut Enes Demiroğlu": "Düşünceli, ağırbaşlı.",
  "Mervan Cengiz": "Genç, saygılı.",
  "Hacı Remzi Özer": "Tecrübeli, temkinli.",
  "Hacı Abdullah Özer": "Eski reis. Çok dindar, nasihat eder, hikmetli konuşur."
};

/* CHAT */
app.post("/chat", async (req, res) => {
  const { bot, mesaj } = req.body;

  res.json({
    reply: `${bot} der ki: ${mesaj} (üslup: ${profil[bot]})`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("OZER-AI API ÇALIŞIYOR : " + PORT);
});
