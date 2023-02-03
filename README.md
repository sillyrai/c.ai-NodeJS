An API for [c.ai](https://c.ai/) that allows interacting to the characters via Node.JS

An example of how it can be used is
```js
import cAI from "./cAI.js";

var ai = new cAI();
await ai.init('<LINK TO CHARACTER>'); // for example https://beta.character.ai/chat?char=ABCDEFGH123456

var msg = await ai.send("Hello");
console.log(msg) // Response from the AI

var msg = await ai.send("How are you doing?");
console.log(msg) // Response from the AI
```

# Notice
this is my first time working with puppeteer and stuff so the code is kind of messy but it does the job
