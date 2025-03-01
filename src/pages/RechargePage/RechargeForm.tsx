import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/UserContextProvider";
import { useContext, useEffect, useState, useCallback } from "react";

// Define types for better type safety
type InfoRowProps = {
    label: string;
    value: string | React.ReactNode;
};

function RechargeForm() {
    const context = useContext(UserContext);
    const [minAmount, setMinAmount] = useState(0);
    const [amount, setAmount] = useState<number>(0);
    const [pending, setPending] = useState(0);
    const gatewayFee = context?.GATEWAY_FEE || 0;

    // Memoize the calculation function
    const calculateTotal = useCallback(() => {
        return ((amount / (1 - gatewayFee / 100)) + 0.01).toFixed(2);
    }, [amount, gatewayFee]);

    useEffect(() => {
        // Load the Razorpay script only once
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        const fetchMemberData = async () => {
            if (!context?.member?.pendingAmount) {
                try {
                    const res = await context?.getMember();
                    const pendingAmount = res?.member?.pendingAmount || 0;
                    setMinAmount(pendingAmount);
                    setPending(pendingAmount);
                } catch (error) {
                    console.error("Failed to fetch member data:", error);
                }
            } else {
                setMinAmount(context.member.pendingAmount);
                setPending(context.member.pendingAmount);
            }
        };
        fetchMemberData();
        return () => {
            if (document.body.contains(script)) {   
                document.body.removeChild(script);
            }
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount > 0) {
            context?.createOrder(parseFloat(calculateTotal()));
        }
    };

    const finalWalletAmount = amount < pending ? "₹0" : `₹${(amount - pending).toString()}`;
    const serviceCharge = amount > 0 ? `₹${(parseFloat(calculateTotal()) - amount).toFixed(2)}` : "₹0";
    const showTotal = amount > 0;

    return (
        <div>
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2 justify-center">
                <InfoRow label="Pending Subscription" value={`-₹${minAmount}`} />
                <InfoRow
                    label="Recharge Amount"
                    value={
                        <div className="flex items-center">
                            <span className="mr-1">₹</span>
                            <Input
                                type="number"
                                min={minAmount}
                                value={amount || ""}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                required
                                className="p-0 w-20"
                                placeholder="Amount.."
                            />
                        </div>
                    }
                />
                <InfoRow label="Service charge" value={serviceCharge} />
                {showTotal && <InfoRow label="Total amount" value={`₹${calculateTotal()}`} />}
                <InfoRow label="Final amount added to wallet" value={finalWalletAmount} />
                <div className="flex justify-end">
                    <Button type="submit" disabled={amount <= 0}>
                        Pay {showTotal ? `₹${calculateTotal()}` : ""}
                    </Button>
                </div>
            </form>
        </div>
    );
}

// Modified InfoRow to handle React elements as values with left alignment
const InfoRow = ({ label, value }: InfoRowProps) => (
    <div className="flex justify-between items-center gap-2">
        <span className="flex-1">{label}</span>
        <div className="w-24">
            {typeof value === 'string' ? <span>{value}</span> : value}
        </div>
    </div>
);

export default RechargeForm;