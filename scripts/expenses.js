import Util from "./utils.js";

const util = new Util();
const expensePath = "expenses.json";

export default class Expense {
    constructor() {
        util.createJSON(expensePath);
    }

    createExpense = (options) => {
        const { description, amount, category } = options;

        try {
            util.validateAmount(amount);
            util.validateBudget(amount);
            util.validateCategory(category);
        } catch (error) {
            console.error(error.message);
            return;
        }

        const data = this._getExpenses();
        const id = data[data.length - 1] ? data[data.length - 1].id + 1 : 1;

        const date = new Date().toLocaleDateString("pt-BR");

        let expense = {
            "id": id,
            "date": date,
            "description": description,
            "amount": amount,
            "category": category
        }

        data.push(expense);

        util.writeJSON(expensePath, data);

        console.log("Expense created Successfully.");
    }

    updateExpense = (options) => {
        const { id, description, amount, category } = options;

        try {
            util.validateID(expensePath, id);
            util.validateAmount(amount);
            util.validateBudget(amount);
            util.validateCategory(category);
        } catch (error) {
            console.error(error.message);
            return;
        }

        const data = this._getExpenses();
        let expenseIndex = data.findIndex(expense => expense.id == id);

        if (description) {
            data[expenseIndex].description = description;
        }

        if (amount) {
            data[expenseIndex].amount = amount;
        }

        if (category) {
            data[expenseIndex].category = category;
        }

        util.writeJSON(expensePath, data);

        console.log("Expense updateded Successfully.");
    }

    deleteExpense = (id) => {
        try {
            util.validateID(id);
        } catch (error) {
            console.error(error.message);
            return;
        }

        const data = this._getExpenses();
        let expenseIndex = data.findIndex(expense => expense.id == id);

        data.splice(expenseIndex, 1);

        util.writeJSON(expensePath, data);

        console.log("Expense deleted Successfully.")
    }

    listExpenses = (category) => {
        try {
            util.validateCategory(category);
        } catch (error) {
            console.error(error.message);
            return;
        }

        const expenses = this._getExpenses();

        if (category) {
            let filteredExpenses = expenses.filter(expense => expense.category == category);

            console.table(filteredExpenses);
            return;
        }

        console.table(expenses);
    }

    summaryExpenses = () => {
        const expenses = this._getExpenses();

        let totalExpenses = 0;
        expenses.forEach((expense) => {
            totalExpenses += expense.amount;
        });

        console.log(`Total Expenses: ${util.formattedValue(totalExpenses)}`);
    }

    summaryByMonth = (monthFilter) => {
        try {
            util.validateMonth(monthFilter);
        } catch (error) {
            console.error(error.message);
            return;
        }

        const expenses = this._getExpenses();

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        const filteredExpenses = expenses.filter(expense => {
            const [day, month, year] = expense.date.split("/").map(Number);
            return month == monthFilter && year == currentYear;
        });

        let totalExpenses = 0;
        filteredExpenses.forEach((expense) => {
            totalExpenses += expense.amount;
        });

        console.log(`Total Expenses for ${util.formattedMonth(monthFilter)}: ${util.formattedValue(totalExpenses)}`);
    }

    _getExpenses = () => {
        return util.readJSON(expensePath);
    }
}
