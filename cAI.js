import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

class cAI{
  constructor(){
  }

  async init(link){
    this.browser = await puppeteer.launch({
      headless: false,
      args: [
          '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
      ],
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  
  // Create a new page
  this.page = await this.browser.newPage();

  // Navigate to the page
  console.log("Navigating to page")
  await this.page.goto(link);

  // Find a button with the text "Accept" (Its a disclaimer button)
  console.log("Finding button")
  const [button] = await this.page.$x("//button[contains(., 'Accept')]");

  // Click the button
  console.log("Clicking button")
  await button.click();

  // find text area with the id "user-input"
  console.log("Finding text box")
  this.textbox = await this.page.$('#user-input');
  if(this.textbox == null){
    console.log("Could not find text box")
  }

  // delay for a second to let the page load
  await this.page.waitForTimeout(3000);

  // Screenshot
  await this.page.screenshot({ path: 'screenshot.png' });

}


  async send(message){
    this.textbox = await this.page.$('#user-input');
    // Click the text box
    console.log("Clicking text box")
    await this.textbox.click()

    // Type the message
    console.log("Typing message")
    await this.textbox.type(message);

    // Press enter
    console.log("Pressing enter")
    await this.textbox.press('Enter');

    // Wait for the response
    console.log("Delaying for response")
   await this.page.waitForTimeout(10000);

    // Get the last object with the class "msg char-msg"
    console.log("Getting response")
    var [response] = await this.page.$x("//div[contains(@class, 'msg char-msg')][last()]");
    

    // Get the text
    console.log("Getting text")
    var text = await this.page.evaluate(el => el.textContent, response);

    // The text is written word by word by the bot, so we need to check time to time if the text is complete. We can do that by comparing the old message length with the new message length
    var oldLength = 0;
    var newLength = text.length;
    while(oldLength != newLength){
      oldLength = newLength;
      await this.page.waitForTimeout(5000);
      const [response] = await this.page.$x("//div[contains(@class, 'msg char-msg')][last()]");
      text = await this.page.evaluate(el => el.textContent, response);
      newLength = text.length;
    }


    // Return the text
    console.log("Returning text")
    return text;

  }
}

// Create a default export
export default cAI;