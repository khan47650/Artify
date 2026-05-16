import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  role: "buyer" | "seller" | "admin";

  phoneNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;

  artistPhoto?: string;
};

type AuthContextType = {
  user: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: UserType) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = "artify_token";
const USER_KEY = "artify_user";

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(null);

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);

    const savedUser = localStorage.getItem(USER_KEY);

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (jwtToken: string, userData: UserType) => {
    localStorage.setItem(TOKEN_KEY, jwtToken);

    localStorage.setItem(USER_KEY, JSON.stringify(userData));

    setToken(jwtToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);

    localStorage.removeItem(USER_KEY);

    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [user, token]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};