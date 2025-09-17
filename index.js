const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// 🌐 Simple web server to keep the bot alive
app.get('/', (req, res) => {
  res.send('✅ AFK Bot is running on SCHOOLSMPRNP.aternos.me');
});

app.listen(3000, () => {
  console.log('🌐 Web server running on port 3000');
});

// 🤖 Bot logic
function createBot() {
  const bot = mineflayer.createBot({
    host: "SCHOOLSMPRNP.aternos.me", // Your Aternos server
    port: 64599,                     // Your custom port
    username: "AFK_Bot",            // Can be any name
    // onlineMode: false            // Uncomment if the server is cracked
  });

  bot.on('spawn', () => {
    console.log('✅ Bot joined the server!');

    // ⛏️ Anti-AFK: make the bot jump every 10 seconds
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('❌ Bot error:', err.message);
  });
}

createBot();
