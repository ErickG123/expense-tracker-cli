import Util from "./utils.js";

const util = new Util();
const budgetsPath = "budgets.json";

export default class Budget {
    constructor() {
        util.createJSON(budgetsPath);
    }

    createBudget = (options) => {
        const { month, amount } = options;

        try {
            util.validateMonth(month);
            util.validateAmount(amount);
        } catch (error) {
            console.log(error.message);
            return;
        }

        const data = this._getBudgets();

        const budgetIndex = data.findIndex(budget => budget.month == month);
        let existBudget = data[budgetIndex];

        if (existBudget) {
            existBudget.amount = amount;

            util.writeJSON(budgetsPath, data);

            return;
        }

        let budget = {
            "month": month,
            "amount": amount
        }

        data.push(budget);

        util.writeJSON(budgetsPath, data);

        console.log("Budget created Successfully.");
    }

    _getBudgets = () => {
        return util.readJSON(budgetsPath);
    }
}
