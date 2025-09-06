
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(express.json());

// Telegram Bot credentials
const BOT_TOKEN = "8267444065:AAGt7byl-yYmt57i2i525Pl5V1nq__2-2Ck";
const CHAT_ID = "8200996015";

// Serve static files (menu.html)
app.use(express.static(path.join(__dirname, "public")));

app.post("/order", async (req, res) => {
  const { name, table, item } = req.body;
  const msg = `🍽️ New Order\n👤 Name: ${name}\n🪑 Table: ${table}\n🛒 Item: ${item}`;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: msg,
    });
    res.json({ success: true, message: "Order sent to Telegram!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
