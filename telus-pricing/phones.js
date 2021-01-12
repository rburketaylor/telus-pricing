"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phone = void 0;
class Phone {
    async init(page) {
        this.search = await page.$("[class='ui fluid search selection dropdown']");
        this.bringItBack = await page.$("#include_bib");
    }
    async getPhones(page) {
        return await page.evaluate(() => {
            let elements = Array.from(document.querySelectorAll('span.text'));
            let phones = elements.map(element => {
                return element.innerHTML;
            });
            return phones;
        });
    }
    async searchPhone(page, name) {
        await this.search.click();
        await page.type(name);
        await page.keyboard.press("Enter");
    }
}
exports.Phone = Phone;
//# sourceMappingURL=phones.js.map