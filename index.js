import cAI from "./cAI.js";

var ai = new cAI();
await ai.init('https://beta.character.ai/chat?char=ABCDEFGHIJKLMNOPQRSTUVWXYZ');

var msg = await ai.send("Hello");
console.log(msg)

var msg = await ai.send("How are you doing?");
console.log(msg)