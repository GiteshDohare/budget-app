import React from 'react';
import {Card, ProgressBar} from "react-bootstrap";
import {currencyFormatter} from "../Util";

interface BudgetCardProps {
    name: string,
    amount: number,
    maxAmount: number,
}

const BudgetCard: React.FC<BudgetCardProps> = ({name, amount, maxAmount}: BudgetCardProps) => {
    return (
        <Card>
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
                    variant={getProgressBarVariant(amount, maxAmount)} />
            </Card.Body>
        </Card>
    );
};

function getProgressBarVariant(amount: number, maxAmount: number) {
    const ratio = amount / maxAmount;

    if(ratio < 0.5) {
        return "primary";
    } else if (ratio < 0.75) {
        return "warning"
    }

    return "danger";
}

export default BudgetCard;

