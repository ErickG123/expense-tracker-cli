# Expense Tracker CLI
Build a simple expense tracker application to manage your finances. The application should allow users to add, delete, and view their expenses. The application should also provide a summary of the expenses.

## Requirements
Application should run from the command line and should have the following features:
- Users can add an expense with a description and amount.
- Users can update an expense.
- Users can delete an expense.
- Users can view all expenses.
- Users can view a summary of all expenses.
- Users can view a summary of expenses for a specific month (of current year).

The list of commands and their expected output is shown below:
```bash
$ expense-tracker add --description "Lunch" --amount 20 --category 1
# Expense created successfully
```

```bash
$ expense-tracker add --description "Dinner" --amount 10 --category 1
# Expense created successfully
```

```bash
$ expense-tracker list
# ID  Date        Description  Amount
# 1   2024-08-06  Lunch        $20
# 2   2024-08-06  Dinner       $10
```

```bash
$ expense-tracker summary
# Total expenses: $30
```

```bash
$ expense-tracker update --id 2 --amount 30
# Expense updateded successfully
```

```bash
$ expense-tracker delete --id 2
# Expense deleted successfully
```

```bash
$ expense-tracker summary
# Total expenses: $20
```

```bash
$ expense-tracker summary --month 8
# Total expenses for August: $20
```

Here are some additional features that you can add to the application:
- Add expense categories and allow users to filter expenses by category.
- Allow users to set a budget for each month and show a warning when the user exceeds the budget.
- Allow users to export expenses to a CSV file.

The list of commands and their expected output is shown below:
```bash
$ expense-tracker create-categort --name "Food"
# Category created successfully
```

```bash
$ expense-tracker create-budget --month 1 --amount 200
# Budget created successfully
```

```bash
$ expense-tracker generate-csv
# CSV file has been saved!
```

## Implementation
- You can implement the application using any programming language of your choice. Here are some suggestions:
- Use any programming language for any available module for parsing command arguments (e.g. python with the argparse, node.js with commander etc).
- Use a simple text file to store the expenses data. You can use JSON, CSV, or any other format to store the data.
- Add error handling to handle invalid inputs and edge cases (e.g. negative amounts, non-existent expense IDs, etc).
- Use functions to modularize the code and make it easier to test and maintain.

Challenge Link: https://roadmap.sh/projects/expense-tracker
