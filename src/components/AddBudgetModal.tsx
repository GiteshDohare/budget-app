import React, {useRef} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useBudgets} from "../contexts/BudgetContext";

interface AddBudgetModalProps {
    show: boolean,
    handleClose: Function
}

const AddBudgetModal = ({show, handleClose}: AddBudgetModalProps) => {

    const nameRef = useRef();
    const maxAmountRef = useRef();
    const {addBudget} = useBudgets();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addBudget(nameRef.current.value, parseFloat(maxAmountRef.current.value));

        handleClose();
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" required ref={nameRef}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="max-spending">
                        <Form.Label>Maximum spending</Form.Label>
                        <Form.Control type="number" required min={0} step={1} ref={maxAmountRef}/>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
};

export default AddBudgetModal;