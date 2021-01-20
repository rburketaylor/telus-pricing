const clipboard = require("clipboardy");

export class Phone {
    private search;
    bringItBack;

    async init(page) {
        this.search = await page.$("[class='ui fluid search selection dropdown']");
        this.bringItBack = await page.$("#include_bib");
    }

    async getPhoneData(page, customerType, phone, phones){
        await customerType.click();
        await page.waitForTimeout(300);
        let phoneDataMapArray = [];
        for(let i = 0; i < phones.length; i++){
            await phone.searchPhone(page, phones[i]);

            let phoneDataMap = new Map();
            //Get the device retail price
            phoneDataMap['name'] = phones[i];
            phoneDataMap['retailPrice'] = page.$('[name=device_price]').value;
            phoneDataMap['deviceDiscount'] = page.$('[name=device_discount]').value;

            if(phone.bringItBack.checked){
                phoneDataMap['bringItBack'] = page.$('[name=bring_it_back]').value;
            }

            phoneDataMapArray.push(phoneDataMap);
        }
        return phoneDataMapArray;
    }
    
    async getPhones(page, customerType): Promise<string[]> {
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

    async searchPhone(page, name: string) {
        await this.search.click();
        await clipboard.writeSync(name);
        await page.keyboard.down("Control");
        await page.keyboard.press("V");
        await page.keyboard.up("Control");
        await page.keyboard.press("Enter");
    }


}