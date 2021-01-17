const puppeteer = require("puppeteer");
import { EasyPayment } from "./plans";
import { Province } from "./provinces";
import { Customer } from "./customer";
import { Phone } from "./phones";

(async () => {

    //Create a new browser & page
    const browser = await puppeteer.launch({devtools: true});
    const page = await browser.newPage();

    try {
        console.time("exec");

        //Go to the Telus calculator website.
        await page.goto("https://telus.trlcloud.com/toolbox/calculator/index?language_id=1&province=AB&language=en");

        //Add jQuery to site
        await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.5.1.min.js' });

        //Declare the classes for different parts/functions of the page.
        const customer = new Customer();
        const province = new Province();
        const phone = new Phone();
        const easyPayment = new EasyPayment();

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

        console.log(process.memoryUsage().heapTotal / 1024 / 1024);
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