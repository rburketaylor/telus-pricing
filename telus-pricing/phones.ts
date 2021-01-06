

export class Phone {
    private search;
    bringItBack;

    async init(page) {
        this.search = await page.$("[class='ui fluid search selection dropdown']");
        this.bringItBack = await page.$("#include_bib");
    }
    
    async getPhones(page): Promise<string[]> {
        return await page.evaluate(() => Array.from(page.$$("span.text")).map((phone) => (phone as HTMLElement).innerText));
    }

    async searchPhone(page, name: string) {
        await this.search.click();
        await page.type(name);
        await page.keyboard.press("Enter");
    }
}