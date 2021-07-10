"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
class Customer {
    consumer;
    smallBusiness;
    midMarket;
    async init(page) {
        this.consumer = await page.$("#Consumer");
        this.smallBusiness = await page.$("#SBS");
        this.midMarket = await page.$("#MM");
    }
}
exports.Customer = Customer;
//# sourceMappingURL=customer.js.map