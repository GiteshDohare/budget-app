import {Button, Container, Stack} from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import {useState} from "react";
import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "./contexts/BudgetContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {

    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState<string>();
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState<string>();
    const {budgets, getBudgetExpenses} = useBudgets();

    const openAddExpenseModal = (budgetId?: string) => {
        setShowAddExpenseModal(true);
        setAddExpenseModalBudgetId(budgetId);
    }


    return (
        <>
            <Container className="my-4">
                <Stack direction="horizontal" gap={2} className="mb-4">
                    <h1 className="me-auto">Budget</h1>
                    <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
                    <Button variant="outline-primary" onClick={() => openAddExpenseModal()}>Add Expense</Button>
                </Stack>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "1rem",
                        alignItems: "flex-start"
                    }}>

                    {
                        budgets.map(budget => {
                                const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
                                return (
                                    <BudgetCard key={budget.id} name={budget.name} amount={amount}
                                                maxAmount={budget.maxAmount}
                                                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                                                onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id)}
                                    />
                                )
                            }
                        )
                    }
                    <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
                                             onViewExpenseClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
                    <TotalBudgetCard/>
                </div>
            </Container>

            <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}/>
            <AddExpenseModal defaultBudgetId={addExpenseModalBudgetId} show={showAddExpenseModal}
                             handleClose={() => setShowAddExpenseModal(false)}/>
            <ViewExpensesModal budgetId={viewExpensesModalBudgetId}
                               handleClose={() => setViewExpensesModalBudgetId(undefined)}/>
        </>

    );
}

export default App;
