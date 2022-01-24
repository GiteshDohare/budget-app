import React, {useRef} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "../contexts/BudgetContext";

interface AddExpenseModal {
    show: boolean,
    handleClose: Function,
    defaultBudgetId: string | undefined
}

const AddExpenseModal = ({show, handleClose, defaultBudgetId}: AddExpenseModal) => {

    const descriptionRef = useRef();
    const amountRef = useRef();
    const budgetIdRef = useRef();
    const {budgets, addExpense} = useBudgets();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addExpense(budgetIdRef.current.value, parseFloat(amountRef.current.value), descriptionRef.current.value);

        handleClose();
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" required ref={descriptionRef}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" required min={0} step={1} ref={amountRef}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="budgetId">
                        <Form.Label>Budget</Form.Label>
                        <Form.Select
                            defaultValue={defaultBudgetId}
                            ref={budgetIdRef}>

                            <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                            {
                                budgets.map(budget => (
                                    <option key={budget.id} value={budget.id}>{budget.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
};

export default AddExpenseModal;