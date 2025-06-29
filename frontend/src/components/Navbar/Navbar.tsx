import { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import type { RootState } from "../../store";

import { FaChevronDown } from "react-icons/fa";
// import useGetLoggedInUser from "../../hooks/users/useGetLoggedInUser";
// import Menu from "./Menu";

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const userId = useSelector((state: RootState) => state.user.user);

  if (!userId) {
    return <div>UserId not found!</div>;
  }

  // const { loggedInUser } = useGetLoggedInUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='relative bg-offwhite p-4 flex justify-end'>
      <div ref={menuRef}>
        <div
          className='bg-customOrange hover:bg-darkCustomOrange py-2 px-4 cursor-pointer rounded-full text-black hover:text-offwhite flex items-center gap-5'
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          {/* <p>
            {loggedInUser.firstname}{" "}
            {loggedInUser.middlename ? loggedInUser.middlename[0] : ""}{" "}
            {loggedInUser.lastname} - {loggedInUser.role}
          </p> */}
          <p>
            <FaChevronDown />
          </p>
        </div>

        {/* {isOpenMenu && <Menu closeMenu={() => setIsOpenMenu(false)} />} */}
      </div>
    </div>
  );
};

export default Navbar;
