import { Command } from "commander";
import Expense from "./scripts/expenses.js";
import Category from "./scripts/categories.js";
import Budget from "./scripts/budgets.js";
import Util from "./scripts/utils.js";

const expense = new Expense();
const category = new Category();
const budget = new Budget();
const util = new Util();
const program = new Command();

program
    .name("expense-tracker")
    .description("Expense Tracker")
    .version("1.0.0")

program
    .command("add")
    .description("Create a Expense")
    .option("--description <description>", "Expense Description")
    .option("--amount <amount>", "Expense Amount", parseFloat)
    .option("--category <category>", "Expense Category", parseInt)
    .action((options) => {
        expense.createExpense(options);
    });

program
    .command("update")
    .description("Update a Expense")
    .option("--id <id>", "Expense ID")
    .option("--description <description>", "Expense Description")
    .option("--amount <amount>", "Expense Amount", parseFloat)
    .option("--category <category>", "Expense Category", parseInt)
    .action((options) => {
        expense.updateExpense(options);
    });

program
    .command("delete")
    .description("Delete a Expense")
    .option("--id <id>", "Expense ID", parseInt)
    .action((options) => {
        expense.deleteExpense(options.id)
    });

program
    .command("list")
    .description("List all Expenses")
    .option("--category <category>", "Expense Category", parseInt)
    .action((options) => {
        expense.listExpenses(options.category);
    });

program
    .command("summary")
    .description("Summary of Expenses")
    .option("--month <month>", "Month Filter", parseInt)
    .action((options) => {
        if (options.month) {
            expense.summaryByMonth(options.month);
        } else {
            expense.summaryExpenses();
        }
    });

program
    .command("create-category")
    .description("Create Expense Category")
    .option("--name <name>", "Expense Category Name")
    .action((options) => {
        category.createCategory(options.name);
    });

program
    .command("create-budget")
    .description("Create Budget for Month")
    .option("--month <month>", "Budget Month", parseInt)
    .option("--amount <amount>", "Budget Value", parseFloat)
    .action((options) => {
        budget.createBudget(options);
    });

program
    .command("generate-csv")
    .description("Generate Expenses CSV")
    .action(() => {
        util.downloadCSV();
    });

program.parse();
