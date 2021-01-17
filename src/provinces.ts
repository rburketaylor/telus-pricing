

export class Province {
    province;

    async init(page) {
        this.province = await page.$("[name=province]");
    }

    provinceSelectOptions = {
        ALBERTA: "AB",
        BRITISH_COLUMBIA: "BC",
        MANITOBA: "MB",
        NEW_BRUNSWICK: "NB",
        NEWFOUNDLAND_LABRADOR: "NL",
        NORTHWEST_TERRITORIES: "NT",
        NOVA_SCOTIA: "NS",
        NUNAVUT: "NU",
        ONTARIO: "ON",
        PRINCE_EDWARD_ISLAND: "PE",
        Quebec: "QC",
        SASKATCHEWAN: "SK",
        YUKON: "YT"
    }
}