import React from 'react';
import {Button, Modal, Stack} from "react-bootstrap";
import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "../contexts/BudgetContext";
import {currencyFormatter} from "../Util";

interface ViewExpensesModalProps {
    budgetId: string | undefined,
    handleClose: Function
}

const ViewExpensesModal = ({budgetId, handleClose}: ViewExpensesModalProps) => {


    const {getBudgetExpenses, budgets, deleteBudget, deleteExpense} = useBudgets();

    const expenses = getBudgetExpenses(budgetId);
    const budget =
        UNCATEGORIZED_BUDGET_ID === budgetId ? {name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID}
            : budgets.find(budget => budget.id === budgetId);


    return (
        <Modal show={budgetId != null} onHide={handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap={2}>
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button variant={"outline-danger"}
                                    onClick={() => {
                                        deleteBudget(budget.id);
                                        handleClose();
                                    }}>
                                Delete
                            </Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap={3}>
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap={2} key={expense.id}>
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className=" fs-5">{currencyFormatter.format(expense.amount)}</div>
                            <Button size="sm" variant="outline-danger"
                                    onClick={() => deleteExpense(expense.id)}>
                                &nbsp;&times;&nbsp;
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    );
};

export default ViewExpensesModal;