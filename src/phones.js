"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phone = void 0;
class Phone {
    async init(page) {
        this.search = await page.$("[class='ui fluid search selection dropdown']");
        this.bringItBack = await page.$("#include_bib");
    }
    async getPhoneData(page, customerType, phone, phones) {
        await customerType.click();
        let phoneData = [];
        for (let i = 0; i < phones.length; i++) {
            await phone.searchPhone(page, phones[i]);
            //Get the device retail price
            const retailPriceElement = await page.$("[class='c_result_height device_price']");
            const retailPrice = await page.evaluate(p => p.innerText, retailPriceElement);
            phoneData.push(phones[i] + " " + retailPrice);
        }
        return phoneData;
    }
    async getPhones(page, customerType) {
        await customerType.click();
        await page.waitForTimeout(300);
        const elements = await page.$$("span.text");
        let phones = [];
        for (const element of elements) {
            const phone = await page.evaluate(p => p.innerText, element);
            phones.push(phone);
        }
        return phones;
    }
    async searchPhone(page, name) {
        await this.search.click();
        await this.search.type(name);
        await page.keyboard.press("Enter");
        const message = await page.$("[class=message]");
        if (message !== "No results found") {
            return true;
        }
        return false;
    }
}
exports.Phone = Phone;
//# sourceMappingURL=phones.js.map