import React, {useContext} from "react";
import {Budget, Expense} from "../Interfaces";
import {v4 as uuidv4} from 'uuid';
import useLocalStorage from "../hooks/useLocalStorage";


const BudgetContext = React.createContext<any>({});
export const UNCATEGORIZED_BUDGET_ID = "uncategorized";

export function useBudgets() {
    return useContext(BudgetContext);
}


export const BudgetsProvider = ({children}: any) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);

    const getBudgetExpenses = (budgetId: string) => {
        return expenses.filter((expense: Expense) => expense.budgetId === budgetId);
    }

    const addExpense = (budgetId: string, amount: number, description: string) => {
        setExpenses((prevExpenses: Expense[]) => {
            return [...prevExpenses, {id: uuidv4(), budgetId, amount, description}]
        })
    }

    const addBudget = (name: string, maxAmount: number) => {
        setBudgets((prevBudget: Budget[]) => {
            if (prevBudget.find(budget => budget.name === name)) {
                return prevBudget;
            }
            return [...prevBudget, {id: uuidv4(), name, maxAmount}]
        })
    }

    const deleteBudget = (id: string) => {
        // move all the expenses of deleted budget to Uncategorized
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) {
                    return expense;
                }
                return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
            })
        })

        setBudgets((prevBudgets: Budget[]) => {
            return prevBudgets.filter(budget => budget.id !== id);
        })
    }

    const deleteExpense = (id: string) => {
        setExpenses((prevExpenses: Expense[]) => {
            return prevExpenses.filter(expense => expense.id !== id);
        })
    }

    return (
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>
            {children}
        </BudgetContext.Provider>
    );
}


