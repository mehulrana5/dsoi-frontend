import RechargeForm from "./RechargeForm";

function RechargePage() {

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                padding: "1em",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "1300px",
                margin: "auto",
            }}
        >
            <h2>Recharge Page</h2>
            <RechargeForm />
        </div>
    );
}

export default RechargePage;
