const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve menu.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "menu.html"));
});

// Handle order POST request
app.post("/order", async (req, res) => {
  const { name, table, item } = req.body;

  const botToken = "8267444065:AAGt7byl-yYmt57i2i525Pl5V1nq__2-2Ck";
  const chatId = "8200996015";
  const message = `🍽️ New Order!\n\n👤 Name: ${name}\n🪑 Table: ${table}\n🍴 Item: ${item}`;

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });

    res.send("✅ Order placed successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Failed to send order to Telegram.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

