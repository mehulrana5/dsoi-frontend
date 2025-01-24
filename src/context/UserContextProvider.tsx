import { createContext, useState, ReactNode, FC } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the User interface
interface User {
    id: string;
    username: string;
    token: string;
}

// Define the context type
interface UserContextType {
    user: User | null;
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

    const [user, setUser] = useState<User | null>({
        id: localStorage.getItem("id") || "",
        username: localStorage.getItem("userName") || "",
        token: localStorage.getItem("token") || ""
    });

    const navigate = useNavigate();

    const login = async (credentials: { username: string; password: string }) => {
        try {
            console.log('Attempting login with:', credentials);
            localStorage.setItem("id", "1");
            localStorage.setItem("userName", "1");
            localStorage.setItem("token", "1");
            navigate('/member');
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("id");
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        navigate('/');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
