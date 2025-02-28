import { createContext, useState, ReactNode, FC } from 'react';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://dsoi-backend.onrender.com/api';
const RAZORPAY_ID_KEY = import.meta.env.VITE_RAZORPAY_ID_KEY;

// Define the context type
interface UserContextType {
    loading: string;
    member: any;
    family: any;
    BASE_URL: String;
    ordersData: {
        status: number,
        data: {
            _id: string,
            member_id: string,
            item_id: string,
            itemInfo: string,
            status: string,
            orderDate: string
        }[],
        count: number
    };
    transactionData: {
        status: number,
        data: {
            action: string,
            amount: number,
            timeStamp: string
        }[],
        count: number,
        message: string
    }
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
    minPayment: (id: string) => Promise<number>;
    getOrders: () => Promise<void>;
    getMember: () => Promise<any>;
    getFamily: () => Promise<any>;
    createOrder: (amount: number) => Promise<any>;
    getTransactions: (id: string, skip: string, limit: string) => Promise<any>;
}

// Create the UserContext
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Define props for UserContextProvider
interface UserContextProviderProps { children: ReactNode; }

// UserContextProvider component
const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<string>("");
    const [member, setMember] = useState<any>(null);
    const [family, setFamily] = useState<any>(null);

    const [ordersData, setOrdersData] = useState<{
        status: number,
        data: {
            _id: string,
            member_id: string,
            item_id: string,
            itemInfo: string,
            status: string,
            orderDate: string
        }[],
        count: number
    }>({ status: 0, data: [], count: 0 });

    const [transactionData, setTransactionData] = useState<{
        status: number,
        data: {
            action: string,
            amount: number,
            timeStamp: string
        }[],
        count: number,
        message: string
    }>({ status: 0, data: [], count: 0, message: "" });

    console.log(`BASE URL ${BASE_URL}`);

    // Function to get global headers
    const getHeaders = () => {
        return {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token") || "Bearer null",
            'id': localStorage.getItem("id") || ""
        };
    };

    const login = async (credentials: { username: string; password: string }) => {
        setLoading("login");

        try {
            const res = await fetch(`${BASE_URL}/member/login`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    userName: credentials.username,
                    password: credentials.password,
                    deviceId: localStorage.getItem("deviceId")
                })
            });

            if (res.status === 401) return logout();

            const data = await res.json();
            if (data.error) {
                if (data.error.status === 403) {
                    localStorage.setItem("id", data.error.data.id)
                    const a = window.confirm("Account logged in from another device do you want to logout from all the devices ?")
                    if (a) {
                        logout();
                        window.location.reload();
                        alert("Login again");
                    }
                }
                else {
                    alert(data.error.message);
                }
                return;
            }
            localStorage.setItem("id", data.data.member.id);
            localStorage.setItem("userName", data.data.member.userName);
            localStorage.setItem("token", `Bearer ${data.data.token}`);
            localStorage.setItem("deviceId", data.data.deviceId);
            navigate('/member');
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        } finally {
            setLoading("");
        }
    };

    const logout = async () => {
        await fetch(`${BASE_URL}/member/logout`, {
            method: 'POST',
            headers: getHeaders()
        });
        localStorage.removeItem("id");
        localStorage.removeItem("deviceId");
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        navigate('/');
    };

    const minPayment = async (id: string) => {
        setLoading("minPayment");
        console.log(id);
        try {
            // const res = await fetch(`${BASE_URL}/payment/min`, {
            //     method: 'POST',
            //     headers: getHeaders(),
            //     body: JSON.stringify(id)
            // });
            // if (res.status === 401) {
            //     logout();
            //     return;
            // }
            // const data = await res.json();
            // if (data.error) {
            //     alert(data.error.message);
            //     return 0;
            // }
            return 1000; // Replace this with the actual value from the response
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
            return 0; // Return a default value in case of error
        } finally {
            setTimeout(() => {
                setLoading("");
            }, 1000);
        }
    };

    const getOrders = async () => {
        setLoading("fetchOrders");
        try {
            const res = await fetch(`${BASE_URL}/getOrders`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ type: "mpo", query: localStorage.getItem("id"), skip: "", limit: "" })
            });

            if (res.status === 401) return logout();

            const data = await res.json();
            if (data.error) {
                alert(data.error.message);
                return [];
            }
            setOrdersData(data)
            return data;
        } catch (error) {
            console.error('Fetch orders error:', error);
            alert('Fetching orders failed. Please try again.');
            return [];
        } finally {
            setLoading("");
        }
    };

    const getMember = async () => {
        setLoading("getMember");
        try {
            const res = await fetch(`${BASE_URL}/getMember`, {
                method: 'GET',
                headers: getHeaders()
            });

            if (res.status === 401) return logout();

            const data = await res.json();
            if (data.error) {
                alert(data.error.message);
                return null;
            }
            setMember(data.member);
            return data;
        } catch (error) {
            console.error('Get member error:', error);
            alert('Fetching member details failed. Please try again.');
            return null;
        } finally {
            setLoading("");
        }
    };

    const getFamily = async () => {
        setLoading("getFamily");
        try {
            const res = await fetch(`${BASE_URL}/getFamily`, {
                method: 'GET',
                headers: getHeaders()
            });

            if (res.status === 401) return logout();

            const data = await res.json();
            if (data.error) {
                alert(data.error.message);
                return null;
            }
            setFamily(data);
            return true;
        } catch (error) {
            console.error('Get family error:', error);
            alert('Fetching family details failed. Please try again.');
            return null;
        } finally {
            setLoading("");
        }
    };

    const createOrder = async (amount: number) => {
        try {
            setLoading("addAmount")
            const newAmount = amount * 100
            const res = await fetch(`${BASE_URL}/createOrder`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ amount: newAmount })
            });

            if (res.status === 401) return logout();

            const data = await res.json();
            handlePayment(data.id, data.amount_due)
            if (data.error) {
                alert(data.error.message);
                return null;
            }

            return null;
        } catch (error) {
            console.error('Create Order error:', error);
            alert('Create Order failed. Please try again.');
            return null;
        } finally {
            setLoading("");
        }
    };

    const handlePayment = (order_id: string, minPay: number) => {
        const options = {
            key: RAZORPAY_ID_KEY,
            amount: minPay,
            currency: "INR",
            order_id: order_id,
            theme: { color: "#3399cc" },
            handler: function () {
                if (BASE_URL === "http://localhost:3000/api") {
                    const headers = {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token") || ""
                    }
                    fetch(`${BASE_URL}/members`, {
                        method: "PUT",
                        headers: headers,
                        body: JSON.stringify({
                            action: "recharge",
                            updates: JSON.stringify({ wallet: minPay / 100 }),
                            id: member._id
                        }),
                    })
                        .then((res) => res.json())
                        .then((data) => console.log("Webhook simulated:", data))
                        .catch((err) => console.error("Webhook error:", err));
                }
            },
        };

        const rzp1 = new (window as any).Razorpay(options);
        rzp1.on("payment.failed", function (response: any) {
            alert(response.error.description);
        });
        rzp1.open();
    };

    const getTransactions = async (id: string, skip: string, limit: string) => {
        setLoading("fetchLogs");
        try {
            const res = await fetch(`${BASE_URL}/getTransactions`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ id, skip, limit })
            });
            if (res.status === 401) return logout();
            const data = await res.json();
            if (data.error) {
                alert(data.error.message);
                return [];
            }
            setTransactionData(data)
            return data;
        } catch (error) {
            console.error('Fetch logs error:', error);
            alert('Fetching logs failed. Please try again.');
            return [];
        } finally {
            setLoading("");
        }
    };

    return (
        <UserContext.Provider value={{
            loading,
            member,
            family,
            BASE_URL,
            ordersData,
            transactionData,
            login,
            logout,
            minPayment,
            getOrders,
            getMember,
            getFamily,
            createOrder,
            getTransactions
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
