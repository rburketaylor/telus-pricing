export class Plan {
    id: string;
    name: string;
    data: number;
    price: number;

    constructor(id: string, name: string, data: number, price: number) {
        this.id = id;
        this.name = name;
        this.data = data;
        this.price = price;
    }
}

export class EasyPayment {
    zeroUpfront;
    lowUpfront;
    lowMonthly;
    basic;
    buyOutright;

    async init(page) {
        this.zeroUpfront = await page.$("#zero_upfront");
        this.lowUpfront = await page.$("#low_upfront");
        this.lowMonthly = await page.$("#low_monthly");
        this.basic = await page.$("#basic");
        this.buyOutright = await page.$("[value='buy_outright']");
    }

    async getPlans(page): Promise<Map<string, Plan[]>> {
        let plansMap: Map<string, Plan[]> = new Map();

        const planTypes = await page.$$("[class=c_plan_name]");
        for (const element of planTypes) {
            //Get name of plan type for the map
            const key: string = await (await element.getProperty("innerText")).jsonValue();

            //Get the parent class of so it can access the rows
            let rows = (await element.$x(".."))[0];
            rows = (await rows.$x(".."))[0];
            rows = (await rows.$x(".."))[0];
            rows = await rows.$$("[class=plan_row]");

            let plans: Plan[] = [];
            for (const row of rows) {
                const items = await row.$$("[class=c_plan_box]");
                for (const box of items) {
                    const priceDiv = await box.$("[class=c_plan_box_price]");

                    //Get the values for the plan object
                    const id = await (await box.getProperty("id")).jsonValue();

                    const name: string = await box.evaluate((boxInner) => {
                        return boxInner.attributes.getNamedItem("data-selected-plan-name").value;
                    }, box);

                    let data = await (await priceDiv.getProperty("innerText")).jsonValue();
                    data = data.slice(0, data.indexOf("G"));

                    const price: number = await box.evaluate((boxInner) => {
                        return boxInner.attributes.getNamedItem("data-selected-plan-price").value;
                    }, box);

                    //Initialize Plan Object
                    const plan = new Plan(id, name, data, price);
                    plans.push(plan);
                }
            }
            plansMap.set(key, plans);
        }
        return plansMap;
    }
}