import { Link, NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import {
  MdExpandMore,
  MdExpandLess,
  MdGroups,
  MdPeople,
  MdPersonAddAlt1,
  MdPowerSettingsNew,
  MdSpaceDashboard,
} from "react-icons/md";
import { useState } from "react";

const Sidebar = () => {
  const menuItems = [
    {
      title: "داشبورد",
      to: "dashboard",
      icon: <MdSpaceDashboard />,
    },
    {
      title: "مدیریت کاربران",
      icon: <MdPeople />,
      iconTwo: <MdExpandMore size={25} />,
      submenu: [
        { title: "همه کاربران", icon: <MdPeople />, to: "users" },
        { title: "افزودن", icon: <MdPersonAddAlt1 />, to: "newuser" },
      ],
    },
    {
      title: "ثبت اطلاعات ملک",
      icon: <MdPeople />,
      iconTwo: <MdExpandMore size={25} />,
      submenu: [
        { title: "لیست اماکن", icon: <MdPeople />, to: "places" },
        {
          title: "افزودن",
          icon: <MdPersonAddAlt1 />,
          to: "addplace",
        },
      ],
    },
    {
      title: "واگذاری ملک",
      icon: <MdPeople />,
      iconTwo: <MdExpandMore size={25} />,
      submenu: [
        { title: "لیست واگذاری ", icon: <MdPeople />, to: "translist" },
       
      ],
    },
  ];

  return (
    <nav className="pl-5 overflow-x-hidden hidden md:block w-20 xl:w-[230px] font-IRANSansWeb">
      <Link to="#" className=" flex items-center text-white pt-4 pr-5">
        <img src={logo} alt="logo" className="w-6 h-6 ml-2" />
        <span className=" xl:flex font-bold hidden "> مخابرات </span>
      </Link>
      <div className=" w-full h-[1px] bg-[#ffffff14] my-6"></div>
      <ul>
        {menuItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} />;
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;

export const MenuItems = ({ items, index }) => {
  const [subMenu, setSubMenu] = useState(false);
  const [sub, setSub] = useState(false);

  return (
    <>
      {items.submenu ? (
        <>
          <li aria-expanded={subMenu ? "true" : "false"} role="link">
            <NavLink
              onClick={() => {
                setSubMenu(!subMenu);
              }}
              // className="flex items-center text-white h-[50px] mb-1 pr-5 rounded-r-full hover:bg-[#ffffff14] "
              className={
                sub
                  ? "bg-slate-100 flex items-center text-slate-800 h-[50px] mb-1 pr-5 rounded-r-full relative z-10 before:content-[''] before:bg-hero-lg before:absolute before:-rotate-90 before:top-0 before:left-0 before:w-[30px] before:h-[30px] before:-mt-[30px] before:z-10 before:-ml-5 before:scale-[1.04] before:bg-[length:100%] after:content-[''] after:bg-hero-lg after:absolute after:top-0 after:left-0 after:w-[30px] after:h-[30px] after:mt-[50px] after:z-10 after:-ml-5 after:scale-[1.04] after:bg-[length:100%] "
                  : "flex items-center text-white relative h-[50px] mb-1 pr-5 rounded-r-full  "
              }
            >
              <div className="ml-3 before:content-[''] before:absolute before:top-0 before:left-0 before:-ml-5 before:h-full before:w-12 before:bg-slate-100 before:z-[-1]">
                {items.icon}
              </div>
              <div className="xl:flex items-center w-full justify-between hidden">
                {items.title}
                <div className="ml-5 z-10">
                  {subMenu ? <MdExpandLess size={25} /> : items.iconTwo}
                </div>
              </div>
            </NavLink>
            <Dropdown
              submenus={items.submenu}
              dropdown={subMenu}
              sub={sub}
              setSub={setSub}
            />
          </li>
        </>
      ) : (
        <li>
          <NavLink
            to={items.to}
            key={index}
            className={(navData) => {
              return navData.isActive
                ? "bg-slate-100 flex items-center text-slate-800 h-[50px] mb-1 pr-5 rounded-r-full relative z-10 before:content-[''] before:bg-hero-lg before:absolute before:-rotate-90 before:top-0 before:left-0 before:w-[30px] before:h-[30px] before:-mt-[30px] before:z-10 before:-ml-5 before:scale-[1.04] before:bg-[length:100%] after:content-[''] after:bg-hero-lg after:absolute after:top-0 after:left-0 after:w-[30px] after:h-[30px] after:mt-[50px] after:z-10 after:-ml-5 after:scale-[1.04] after:bg-[length:100%] "
                : "flex items-center text-white relative h-[50px] mb-1 pr-5 rounded-r-full hover:bg-[#ffffff14]";
            }}
          >
            <div className="ml-3 before:content-['']  before:absolute before:top-0 before:left-0 before:-ml-5 before:h-full before:w-12 before:bg-slate-100 before:z-[-1]">
              {items.icon}
            </div>
            <div className="xl:flex items-center w-full justify-between hidden  ">
              {items.title}
              <div className="ml-5 z-10">{items.iconTwo}</div>
            </div>
          </NavLink>
        </li>
      )}
    </>
  );
};

export const Dropdown = ({ submenus, dropdown, sub, setSub }) => {
  return (
    <ul
      className={`mr-1 xl:mr-5 ${
        dropdown ? "h-auto rounded-lg bg-[#0000001a]" : "h-0 overflow-hidden"
      } `}
    >
      {submenus.map((submenu, index) => (
        <li key={index}>
          <NavLink
            to={submenu.to}
            // onClick={() => setSub(true)}
            // className="flex items-center text-white relative h-[50px] mb-1 pr-5 rounded-r-full  "
            className={(navData) => {
              return navData.isActive
                ? "bg-slate-100 flex items-center text-slate-800 h-[50px] mb-1 pr-5 rounded-r-full relative z-10 before:content-[''] before:bg-hero-lg before:absolute before:-rotate-90 before:top-0 before:left-0 before:w-[30px] before:h-[30px] before:-mt-[30px] before:z-10 before:-ml-5 before:scale-[1.04] before:bg-[length:100%] after:content-[''] after:bg-hero-lg after:absolute after:top-0 after:left-0 after:w-[30px] after:h-[30px] after:mt-[50px] after:z-10 after:-ml-5 after:scale-[1.04] after:bg-[length:100%] "
                : "flex items-center text-white relative h-[50px] mb-1 pr-5 rounded-r-full  ";
            }}
          >
            <div className="ml-3 before:content-[''] before:absolute before:top-0 before:left-0 before:-ml-5 before:h-full before:w-12 before:bg-slate-100 before:z-[-1]">
              {submenu.icon}
            </div>
            <div className="hidden xl:flex items-center w-full justify-between ">
              {submenu.title}
              <div className="ml-5 z-10">{submenu.iconTwo}</div>
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
