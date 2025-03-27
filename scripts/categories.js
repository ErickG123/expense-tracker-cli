import Util from "./utils.js";

const util = new Util();
const categoriesPath = "categories.json";

export default class Category {
    constructor() {
        util.createJSON(categoriesPath);
    }

    createCategory = (name) => {
        const data = this._getCategories();
        const id = data[data.length - 1] ? data[data.length - 1].id + 1 : 1;

        let category = {
            "id": id,
            "name": name
        }

        data.push(category);

        util.writeJSON(categoriesPath, data);

        console.log("Category created Successfully.");
    }

    _getCategories = () => {
        return util.readJSON(categoriesPath);
    }
}
