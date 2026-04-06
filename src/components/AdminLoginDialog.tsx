import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, LogOut } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const AdminLoginDialog = () => {
  const { isAdmin, showAdminLogin, setShowAdminLogin, login, logout } = useAdmin();
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(password);
    setPassword("");
  };

  return (
    <>
      {/* Hidden trigger: triple-click the footer copyright area or use this fixed button */}
      <button
        onClick={() => isAdmin ? logout() : setShowAdminLogin(true)}
        className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors opacity-30 hover:opacity-100"
        title={isAdmin ? "Exit admin mode" : "Admin login"}
      >
        {isAdmin ? <LogOut className="h-4 w-4 text-destructive" /> : <Shield className="h-4 w-4 text-muted-foreground" />}
      </button>

      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Access
            </DialogTitle>
            <DialogDescription>
              Enter the admin password to unlock management features.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <Button type="submit" className="w-full">Unlock</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminLoginDialog;
