import { JSX } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaAccessibleIcon,
  FaFilm,
  FaHome,
  FaPlusSquare,
  FaRegCompass,
  FaRegHeart,
  FaRegPaperPlane,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
import { AppRoutes } from "../constants/appRoutes";

const NAV_ITEMS = [
  { label: "Home", icon: FaHome, path: "/" },
  { label: "Search", icon: FaSearch, path: "/search" },
  { label: "Interesting", icon: FaRegCompass, path: "/explore" },
  { label: "Reels", icon: FaFilm, path: "/reels" },
  { label: "Messages", icon: FaRegPaperPlane, path: "/messages" },
  { label: "Notifications", icon: FaRegHeart, path: "/notifications" },
  { label: "Create", icon: FaPlusSquare, path: "/create" },
  { label: "Profile", icon: FaUserCircle, path: "/profile" },
];

const Sidebar = (): JSX.Element => {
  return (
    <aside className='h-screen w-67 shrink-0 px-3 py-2'>
      <Link to={AppRoutes.HOME} className='block py-5 mb-6'>
        <FaAccessibleIcon className='text-6xl cursor-pointer' />
      </Link>

      <nav>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className='my-2 py-3 px-3 rounded-lg hover:bg-gray-500/30 transition-colors'
            >
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex gap-4 transition-all items-center
                  ${isActive ? "font-bold" : "font-normal"}
                `}
              >
                <item.icon className='text-2xl' />
                <span className='text-lg'>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
