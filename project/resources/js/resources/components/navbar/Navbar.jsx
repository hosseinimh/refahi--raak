import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import profile from "../../images/default-logo.png";
import {
  useAuth,
  useAuthActions,
} from "../providers/userProvider/AuthPrivider";
const Navbar = () => {
  const auth = useAuth();
  const setAuth = useAuthActions();
  const navigate = useNavigate();
  const logOutHandler = () => {
    console.log("iman");
    if (auth) {
      localStorage.removeItem("auth");
      setAuth(false);
      navigate("/login");
    }
  };
  return (
    <div className="flex items-center justify-between h-[67px] border-b border-slate-200 font-IRANSansWeb">
      <div>
        <h2 className=" text-primaryOne">داشبورد</h2>
      </div>
      <div className="flex items-center justify-center gap-5 ">
        <span onClick={logOutHandler} className="cursor-pointer text-slate-600 "><MdLogout size={24}/></span>
        <div className=" text-slate-600 cursor-pointer before:inline-block before:absolute before:content-[''] before:w-2 before:h-2 before:bg-red-600 before:rounded-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-1.5 w-5 h-5 dark:text-slate-500"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </div>
        <div className="w-10 h-10 ">
          <img src={profile} alt="" className="rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
