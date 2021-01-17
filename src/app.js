"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const plans_1 = require("./plans");
const provinces_1 = require("./provinces");
const customer_1 = require("./customer");
const phones_1 = require("./phones");
(async () => {
    try {
        //Go to the Telus calculator website.
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto("https://telus.trlcloud.com/toolbox/calculator/index?language_id=1&province=AB&language=en");
        //Add jQuery to site
        await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.min.js' });
        const customer = new customer_1.Customer();
        const province = new provinces_1.Province();
        const phone = new phones_1.Phone();
        const easyPayment = new plans_1.EasyPayment();
        //Initialize Objects to Interact With Page Elements
        await customer.init(page);
        await province.init(page);
        await phone.init(page);
        await easyPayment.init(page);
        const phones = await phone.getPhones(page);
        for (let i = 0; i < phones.length; i++) {
            let counter = 0;
            while (counter < 3) {
                switch (counter) {
                    case 0:
                        await customer.consumer.click();
                        break;
                    case 1:
                        await customer.smallBusiness.click();
                        break;
                    case 2:
                        await customer.midMarket.click();
                        break;
                }
                await phone.searchPhone(page, phones[i]);
                counter++;
            }
        }
        await page.close();
        await browser.close();
    }
    catch (err) {
        console.log(err);
    }
})();
//# sourceMappingURL=app.js.map