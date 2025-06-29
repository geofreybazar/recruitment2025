import { NavLink } from "react-router";

import logo from "/logo.png";

const isNotActiveLink =
  "px-5 py-2 text-bfpDarkGray transition-all duration-300 ease-in-out ";
const isActiveLink =
  "ml-5 px-3 py-2 rounded-l-md bg-bfpDarkGray text-offwhite transition-all duration-300 ease-in-out";

const Sidebar = () => {
  return (
    <div className='w-full h-full flex flex-col text-bfpDarkGray overflow-auto'>
      <div className='w-full flex flex-col items-center p-4'>
        <div className='w-42'>
          <img src={logo} />
        </div>
        <p className='text-xl'>BFP-NCR</p>
      </div>
      <div className='flex-1 flex flex-col justify-between py-5 overflow-auto'>
        <div className='flex flex-col overflow-auto'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? isActiveLink : isNotActiveLink
            }
          >
            <span className='flex items-center gap-3'>Dashboard</span>
          </NavLink>
          <NavLink
            to='/recruits'
            className={({ isActive }) =>
              isActive ? isActiveLink : isNotActiveLink
            }
          >
            <span className='flex items-center gap-3'>Recruits</span>
          </NavLink>
        </div>
        <div className='p-4 flex w-full justify-center text-center'>
          Recruitment System 2025
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
