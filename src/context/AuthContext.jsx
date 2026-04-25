import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Demo user data
const DEMO_USER = {
  email: "user@demo.com",
  password: "123456",
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const loginUser = (email, password) => {
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      setCurrentUser({ email });
      return true;
    }
    return false;
  };

  const signOut = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);