export class Customer {
    consumer;
    smallBusiness;
    midMarket;

    async init(page) {
        this.consumer = await page.$("#Consumer");
        this.smallBusiness = await page.$("#SBS");
        this.midMarket = await page.$("#MM");
    }
}