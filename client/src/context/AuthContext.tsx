import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "MEMBER";
}

interface AuthData {
    token: string;
    user: User;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (data: AuthData) => void;
    logout: () => void;
}

const AuthContext = createContext<
    AuthContextType | undefined
>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode; }) => {
    const [user, setUser] = useState<User | null>(null);

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedUser =
            localStorage.getItem("user");

        const storedToken =
            localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const login = (data: AuthData) => {
        setUser(data.user);
        setToken(data.token);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        window.location.href = "/";
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};

export {
    AuthProvider,
    useAuth
};