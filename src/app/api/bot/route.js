require('dotenv').config();
const { Bot } = require("grammy");

// Telegram 봇 토큰
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// 봇 초기화
await bot.init();

// /start 명령어 처리
bot.command("start", async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: "🔘 Start Simulating", web_app: { url: "https://www.orvyn.world" } }],  // 게임 링크 수정
      [{ text: "📖 Docs", url: "https://orvyn.gitbook.io/orvyn-docs" }],
      [{ text: "💬 Telegram", url: "https://t.me/orvynai" }],
      [{ text: "🧵 Twitter (X)", url: "https://x.com/orvynai" }],
      [{ text: "🌐 Website", url: "https://www.orvyn.world" }],
    ],
  };

  const message = `
🧠 Welcome to Orvyn!

You've just entered the simulation layer of Web3 — where systems are tested, agents are trained, and intelligent infrastructure is born.

🔍 What you can do here:
🌍 Launch real-time digital twin simulations  
🤖 Train and evaluate AI agents in adaptive environments  
🔗 Connect simulations to on-chain + off-chain data  
📊 Stress-test DAOs, DeFi logic, or governance proposals  
🏆 Use $ORVN to unlock advanced modules and earn simulation rewards

🚀 This isn't just another crypto tool.  
It's the protocol to model what hasn't happened — yet.  
Simulate it. Prove it. Deploy with confidence.
  `;

  const pngUrl = 'https://orvnbot.vercel.app/ovrnpic.png';  // public 폴더에 있는 이미지 파일 경로

  // ✅ GIF + 메시지 + 버튼을 한 번에 보냄
  await ctx.replyWithPhoto(pngUrl, {
    caption: message,
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
});

// ✅ Vercel 서버리스 API로 실행
export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Bot Error:", error);
    return new Response("Error", { status: 500 });
  }
}

