

export class Phone {
    private search;
    bringItBack;

    async init(page) {
        this.search = await page.$("[class='ui fluid search selection dropdown']");
        this.bringItBack = await page.$("#include_bib");
    }
    
    async getPhones(page): Promise<string[]> {
        return await page.evaluate(() => {
            let elements = Array.from(document.querySelectorAll('span.text'));
            let phones = elements.map(element => {
                return element.innerHTML;
            });
            return phones;
        });
    }

    async searchPhone(page, name: string) {
        await this.search.click();
        await page.type(name);
        await page.keyboard.press("Enter");
    }
}