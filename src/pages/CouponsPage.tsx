import { UserContext } from "@/context/UserContextProvider";
import { useContext, useEffect, useState } from "react"

function CouponsPage() {
    const [orders, setOrders] = useState<{ id: string; }[]>([]);

    const context = useContext(UserContext)

    useEffect(() => {
        // context?.fetchOrders().then
    }, []);

    console.log(orders);

    return (
        <div style={{
            display: 'flex',
            flexWrap: "wrap",
            flexDirection: "column",
            padding: "1em",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "1300px",
            margin: "auto"
        }}>
            <h1>Coupons Page</h1>
        </div>
    )
}

export default CouponsPage
