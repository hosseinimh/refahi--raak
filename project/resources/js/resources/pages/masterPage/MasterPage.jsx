import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../components/providers/userProvider/AuthPrivider";
import Sidebar from "../../components/sidebar/Sidebar";

const MasterPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/panel" && auth) {
      navigate("/panel/dashboard");
    }
  }, []);

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex bg-primaryOne px-9 py-4">
      <Sidebar />
      <div className="flex-1 bg-slate-100 px-4 pb-10 min-h-screen rounded-3xl">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default MasterPage;
