import React from 'react';
import {Button, Card, ProgressBar, Stack} from "react-bootstrap";
import {currencyFormatter} from "../Util";

interface BudgetCardProps {
    name: string,
    amount: number,
    maxAmount: number,
    gray?: boolean
}

const BudgetCard: React.FC<BudgetCardProps> = ({name, amount, maxAmount, gray}: BudgetCardProps) => {

    const classNames = [];
    if (amount > maxAmount) {
        classNames.push("bg-danger bg-opacity-10")
    } else if (gray) {
        classNames.push("bg-light")
    }

    return (
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title
                    className="d-flex
                    justify-content-between
                    align-items-baseline
                    fw-normal
                    mb-3
                    ">
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(amount)}
                        <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(maxAmount)}</span>
                    </div>
                </Card.Title>
                <ProgressBar
                    className="rounded-pill"
                    min={0}
                    max={maxAmount}
                    now={amount}
                    variant={getProgressBarVariant(amount, maxAmount)}/>
                <Stack direction="horizontal" gap={2} className="mt-4">
                    <Button variant="outline-primary" className="ms-auto">Add Expense</Button>
                    <Button variant="outline-secondary">View Expense</Button>
                </Stack>
            </Card.Body>
        </Card>
    );
};

function getProgressBarVariant(amount: number, maxAmount: number) {
    const ratio = amount / maxAmount;

    if (ratio < 0.5) {
        return "primary";
    } else if (ratio < 0.75) {
        return "warning"
    }

    return "danger";
}

export default BudgetCard;

