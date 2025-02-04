import { createContext, useState, ReactNode, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://dsoi-backend.onrender.com/api';
const RAZORPAY_ID_KEY = import.meta.env.VITE_RAZORPAY_ID_KEY;

// Define the context type
interface UserContextType {
    loading: string;
    member: any;
    family: any;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
    minPayment: (id: string) => Promise<number>;
    addAmount: (amount: number) => void;
    fetchOrders: () => Promise<[]>;
    getMember: () => Promise<any>;
    getFamily: () => Promise<any>;
    BASE_URL: String;
    createOrder: (amount: number) => Promise<any>;
}

// Create the UserContext
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Define props for UserContextProvider
interface UserContextProviderProps {
    children: ReactNode;
}

// UserContextProvider component
const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState<string>("");
    const [member, setMember] = useState<any>(null);
    const [family, setFamily] = useState<any>(null);
    const navigate = useNavigate();

    console.log(`BASE URL ${BASE_URL}`);

    useEffect(() => {
        if (localStorage.getItem("id")) {
            if (!member) {
                getMember()
            }
            if (!family) {
                getFamily()
            }
        }
    }, [])

    // Function to get global headers
    const getHeaders = () => {
        return {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token") || ""
        };
    };

    const login = async (credentials: { username: string; password: string }) => {
        setLoading("login");

        try {
            const res = await fetch(`${BASE_URL}/member/login`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ userName: credentials.username, password: credentials.password })
            });
            if (res.status === 401) {
                logout();
                return;
            }
            const data = await res.json();
            if (data.error) {
                alert(data.error.message);
                return;
            }
            localStorage.setItem("id", data.member.id);
            localStorage.setItem("userName", data.member.userName);
            localStorage.setItem("token", `Berear ${data.token}`);
            navigate('/member');
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        } finally {
            setLoading("");
        }
    };

    const logout = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        navigate('/');
        window.location.reload()
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

    const addAmount = async (amount: number) => {
        setLoading("addAmount");
        try {
            const res = await fetch(`${BASE_URL}/members`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify({
                    updates: {"wallet":amount},
                    isCronCommand: "false",
                    action: "recharge",
                    id: localStorage.getItem("id")
                })
            });
            const data = await res.json();
            if (data.error) {
                alert(data.error.message);
                return;
            }
            alert(`after gate way work update member wallet and add ${amount}`)
            console.log(amount);
        } catch (error) {
            console.error('Add amount error:', error);
            alert('Adding amount failed. Please try again.');
        } finally {
            setTimeout(() => {
                setLoading("");
            }, 1000);
        }
    };

    const fetchOrders = async () => {
        setLoading("fetchOrders");
        try {
            const res = await fetch(`${BASE_URL}/getOrders`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ member_id: localStorage.getItem("id"), status: "pending" })
            });
            if (res.status === 401) {
                logout();
                return;
            }
            const data = await res.json();
            if (data.error) {
                alert(data.error.message);
                return [];
            }
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
            if (res.status === 401) {
                logout();
                return null;
            }
            const data = await res.json();
            if (data.error) {
                alert(data.error.message);
                return null;
            }
            setMember(data);
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
            if (res.status === 401) {
                logout();
                return null;
            }
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
            const newAmount = amount * 100
            const res = await fetch(`${BASE_URL}/createOrder`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ amount: newAmount })
            });

            if (res.status === 401) {
                logout();
                return null;
            }

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
            image: "https://example.com/your_logo",
            order_id: order_id,
            handler: function (response: any) {
                console.log(response);
                addAmount(minPay / 100)
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new (window as any).Razorpay(options);
        rzp1.on("payment.failed", function (response: any) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
    }

    return (
        <UserContext.Provider value={{ loading, member, family, login, logout, minPayment, addAmount, fetchOrders, getMember, getFamily, BASE_URL, createOrder }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
