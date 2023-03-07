import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const AuthContextActions = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")) ?? false);

   useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(user));
  }, [user]);
  return (
    <AuthContext.Provider value={user}>
      <AuthContextActions.Provider value={setUser}>
        {children}
      </AuthContextActions.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
export const useAuthActions = () => useContext(AuthContextActions);

