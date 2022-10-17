import { useState, createContext, useEffect, useCallback, useMemo, useContext } from "react";
import { AuthService } from "../services/api/auth/AuthService";

type ContextData = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
};

const AuthContext = createContext({} as ContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = "APP_ACCESS_TOKEN";

type AuthProviderProps = {
  children: JSX.Element;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    if (accessToken) {
      setAccessToken(accessToken);
    } else {
      setAccessToken(undefined);
    }
  }, []);

  //sempre criar a função passada do provider como usecallback
  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);

    if (result instanceof Error) {
      return result.message;
    }

    localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, result.accessToken);
    setAccessToken(result.accessToken);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
