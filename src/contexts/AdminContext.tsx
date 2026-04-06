import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

const ADMIN_PASSWORD = "NazAdmin2024!";

interface AdminContextType {
  isAdmin: boolean;
  showAdminLogin: boolean;
  setShowAdminLogin: (show: boolean) => void;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      toast({ title: "Admin mode activated" });
      return true;
    }
    toast({ title: "Incorrect password", variant: "destructive" });
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    toast({ title: "Admin mode deactivated" });
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, showAdminLogin, setShowAdminLogin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};
