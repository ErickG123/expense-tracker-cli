import * as fs from "fs";

export default class Util {
    createJSON = (path) => {
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify([], null, 2));
        }
    }

    readJSON = (path) => {
        let data = fs.readFileSync(path, "utf8");
        data = JSON.parse(data);

        return data;
    }

    writeJSON = (path, data) => {
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
    }

    formattedValue = (value) => {
        return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }

    validateAmount = (amount) => {
        if (amount <= 0) {
            throw new Error("The expense amount must be greater than 0.");
        }
    }

    validateID = (path, id) => {
        const data = this.readJSON(path);

        const taskIndex = data.findIndex(task => task.id == id);

        if (taskIndex == -1) {
            throw new Error("Expense ID not found.");
        }
    }

    validateCategory = (id) => {
        if (!id) return;

        const data = this.readJSON("categories.json");

        const categoryIndex = data.findIndex(category => category.id == id);

        if (categoryIndex == -1) {
            throw new Error("Category ID not found.");
        }
    }

    formattedMonth = (month) => {
        switch (month) {
            case 1:
                return "January";
            case 2:
                return "February";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "October";
            case 11:
                return "November";
            case 12:
                return "December";
            default:
                return "Invalid month";
        }
    }

    validateMonth = (month) => {
        if (month <= 0 || month > 12) {
            throw new Error("Invalid month");
        }
    }

    validateBudget = (amount) => {
        const currentMonth = new Date().getMonth() + 1;

        const expenses = this.readJSON("expenses.json");
        const budgets = this.readJSON("budgets.json");

        const filteredExpenses = expenses.filter(expense => {
            const [day, month, year] = expense.date.split("/").map(Number);
            return month == currentMonth;
        });

        const budgetCurrentMonth = budgets.filter(budget => budget.month == currentMonth);

        let totalExpenses = 0;
        filteredExpenses.forEach((expense) => {
            totalExpenses += expense.amount;
        });

        if (totalExpenses + amount > budgetCurrentMonth[0].amount) {
            throw new Error("You have reached the limit of your budget.");
        }
    }

    jsonToCsv = (json) => {
        const headers = Object.keys(json[0]);
        const csvRows = [];

        csvRows.push(headers.join(","));

        json.forEach(row => {
            const values = headers.map(header => {
                const value = row[header];
                return `"${value}"`;
            });

            csvRows.push(values.join(","));
        });

        return csvRows.join("\n");
    }

    downloadCSV = () => {
        const data = this.readJSON("expenses.json");
        const csv = this.jsonToCsv(data);

        fs.writeFile("expenses.csv", csv, (err) => {
            if (err) throw err;

            console.log("CSV file has been saved!");
        });
    };
}
