import { TransactionTable } from "./TransactionTable";
function TransactionsPage() {
    return (
        <div style={{
            display: 'flex',
            flexWrap: "wrap",
            padding: "1em",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "1300px",
            margin: "auto"
        }}>
            <h1>Transactions Page</h1>
            <TransactionTable />
        </div>
    )
}

export default TransactionsPage
