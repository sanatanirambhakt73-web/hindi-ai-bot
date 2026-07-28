import { Telegraf } from "telegraf";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const memory = new Map();

bot.start(async(ctx)=>{
await ctx.reply(
`🙏 नमस्ते!

मैं Hindi AI Bot हूँ।

मुझसे हिंदी में कुछ भी पूछ सकते हैं।`
);
});

bot.command("help",async(ctx)=>{
await ctx.reply(
`Commands

/start
/help
/ping`
);
});

bot.command("ping",async(ctx)=>{
await ctx.reply("🏓 Pong");
});

bot.on("text",async(ctx)=>{

const id=ctx.chat.id;

const msg=ctx.message.text;

if(!memory.has(id)){
memory.set(id,[]);
}

let history=memory.get(id);

history.push({
role:"user",
text:msg
});

if(history.length>10){
history.shift();
}

let prompt=`

तुम ChatGPT जैसी Natural Hindi में बात करने वाले Assistant हो.

Rules:

1. हमेशा हिंदी में जवाब देना.

2. Friendly रहना.

3. Emoji कम इस्तेमाल करना.

4. अगर User English बोले तो English में जवाब देना.

Conversation:
`;

for(const h of history){

prompt+=`

User: ${h.text}

`;

}
