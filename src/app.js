"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const plans_1 = require("./plans");
const provinces_1 = require("./provinces");
const customer_1 = require("./customer");
const phones_1 = require("./phones");
(async () => {
    //Create a new browser & page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        console.time("exec");
        //Go to the Telus calculator website.
        await page.goto("https://telus.trlcloud.com/toolbox/calculator/index?language_id=1&province=AB&language=en");
        //Add jQuery to site
        await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.5.1.min.js' });
        //Declare the classes for different parts/functions of the page.
        const customer = new customer_1.Customer();
        const province = new provinces_1.Province();
        const phone = new phones_1.Phone();
        const easyPayment = new plans_1.EasyPayment();
        //Initialize Objects to Interact With Page Elements
        await customer.init(page);
        await province.init(page);
        await phone.init(page);
        await easyPayment.init(page);
        //Get phones available for each customer type.
        const phonesConsumer = await phone.getPhones(page, customer.consumer);
        const phonesBusiness = await phone.getPhones(page, customer.smallBusiness);
        const phonesMidMarket = await phone.getPhones(page, customer.midMarket);
        //Get pricing data for each phone from each customer type.
        let consumerPhoneData = await phone.getPhoneData(page, customer.consumer, phone, phonesConsumer);
        let businessPhoneData = await phone.getPhoneData(page, customer.smallBusiness, phone, phonesBusiness);
        let midMarketPhoneData = await phone.getPhoneData(page, customer.midMarket, phone, phonesMidMarket);
        console.timeEnd("exec");
    }
    catch (err) {
        console.log(err);
    }
    finally {
        await page.close();
        await browser.close();
    }
})();
//# sourceMappingURL=app.js.map