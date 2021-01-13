"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phone = void 0;
class Phone {
    async init(page) {
        this.search = await page.$("[class='ui fluid search selection dropdown']");
        this.bringItBack = await page.$("#include_bib");
    }
    async getPhones(page) {
        const elements = await page.$$("span.text");
        let phones = new Array();
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
    }
}
exports.Phone = Phone;
//# sourceMappingURL=phones.js.map