// ReSharper disable once CommonJsExternalModule
const puppeteer = require("puppeteer");
import { Plan, EasyPayment } from "./plans";
import { Province } from "./provinces";
import { Customer } from "./customer";
import { Phone } from "./phones";

(async () => {
    //Go to the Telus calculator website.
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://telus.trlcloud.com/toolbox/calculator/index?language_id=1&province=AB&language=en");

    const customer = new Customer();
    const province = new Province();
    const phone = new Phone();
    const easyPayment = new EasyPayment();

    //Initialize Objects to Interact With Page Elements
    await customer.init(page);
    await province.init(page);
    await phone.init(page);
    await easyPayment.init(page);


    const phones = await phone.getPhones(page);
    for (let i = 0; i < phones.length; i++) {
        let counter = 0;
        while (counter < 3) {
            switch(counter) {
            case 0:
                await customer.consumer.click();
                break;
            case 1:
                await customer.smallBusiness.click();
                break;
            case 2:
                customer.midMarket.click();
            }

            await phone.searchPhone(page, phones[i]);

            counter++;
        }
    }

    await page.close();
    await browser.close();
})();