<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<title>ÖZER DİVANI</title>
<style>
body { margin:0;font-family:Arial;background:#0a192f;color:#fff }
#chatbox{height:80vh;overflow:auto;padding:15px}
.msg{margin:8px 0;padding:10px;border-radius:10px}
.lider{background:#fff3c4;color:#000}
.bot{background:#e0e0e0;color:#000}
input,button{padding:10px;font-size:16px}
</style>
</head>
<body>

<h2 style="text-align:center">ÖZER DİVANI</h2>

<div id="chatbox"></div>

<input id="mesaj" placeholder="Mesaj yaz (örn: Hacı Abdullah nasihat ver)">
<button onclick="gonder()">Gönder</button>

<script>
const API_URL = "https://ozer-ai.onrender.com/chat";

const bots = [
  "Kerem Özer",
  "Faruk Özer",
  "Ahmet Özer",
  "Ali Özer",
  "Mahmut Enes Demiroğlu",
  "Mervan Cengiz",
  "Hacı Remzi Özer",
  "Hacı Abdullah Özer"
];

function ekle(isim, mesaj, sinif){
  const d=document.createElement("div");
  d.className="msg "+sinif;
  d.innerHTML="<b>"+isim+":</b> "+mesaj;
  document.getElementById("chatbox").appendChild(d);
}

async function gonder(){
  const m=document.getElementById("mesaj").value.trim();
  if(!m) return;
  document.getElementById("mesaj").value="";
  ekle("Said Özer",m,"lider");

  const bot = bots.find(b=>m.toLowerCase().includes(b.toLowerCase().split(" ")[0]));
  if(!bot) return;

  const r = await fetch(API_URL,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ bot:bot, mesaj:m })
  });

  const j = await r.json();
  ekle(bot,j.reply || "...","bot");
}
</script>

</body>
</html>
