import React from 'react';
import BudgetCard from "./BudgetCard";
import {useBudgets} from "../contexts/BudgetContext";

const TotalBudgetCard = () => {

    const {budgets, expenses} = useBudgets();
    const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
    const maxAmount = budgets.reduce((total, budget) => total + budget.maxAmount, 0);

    if (maxAmount === 0) {
        return null;
    }
    return (
        <BudgetCard amount={amount} maxAmount={maxAmount} name="Total" gray hideButtons/>
    );
};

export default TotalBudgetCard;