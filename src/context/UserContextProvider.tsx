import { createContext, useState, ReactNode, FC } from 'react';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://dsoi-backend.onrender.com/api';

// Define the context type
interface UserContextType {
    loading: string;
    member: any;
    family: any;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
    minPayment: (id: { id: string }) => Promise<number>;
    addAmount: (amount: { amount: number }) => void;
    fetchOrders: () => Promise<[]>;
    getMember: () => Promise<any>;
    getFamily: () => Promise<any>;
    BASE_URL: String;
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
    };

    const minPayment = async (id: { id: string }) => {
        setLoading("minPayment");
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
            console.log(id);
            return 980; // Replace this with the actual value from the response
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

    const addAmount = async (amount: { amount: number }) => {
        setLoading("addAmount");
        try {
            // const res = await fetch(`${BASE_URL}/members`, {
            //     method: 'PUT',
            //     headers: getHeaders(),
            //     body: JSON.stringify({ wallet: amount })
            // });
            // const data = await res.json();
            // if (data.error) {
            //     alert(data.error.message);
            //     return;
            // }
            // const data = await res.json();
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
            setMember(data); // Store member data
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

    return (
        <UserContext.Provider value={{ loading, member, family, login, logout, minPayment, addAmount, fetchOrders, getMember, getFamily, BASE_URL }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
