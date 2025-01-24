import { createContext, useState, ReactNode, FC } from 'react';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Define the context type
interface UserContextType {
    loading: string;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
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
    const navigate = useNavigate();

    const login = async (credentials: { username: string; password: string }) => {
        setLoading("login");
        try {
            const res = await fetch(`${BASE_URL}/member/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName: credentials.username, password: credentials.password })
            });
            const data = await res.json();
            if (data.error) {
                alert(data.error.message);
                return;
            }
            localStorage.setItem("id", data.member.id);
            localStorage.setItem("userName", data.member.userName);
            localStorage.setItem("token", data.token);
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

    return (
        <UserContext.Provider value={{ loading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
