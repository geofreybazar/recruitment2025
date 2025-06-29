import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import useLogoutUser from "../../hooks/users/useLogoutUser";
import { AxiosError } from "axios";
import { FaSpinner } from "react-icons/fa";

interface MenuProps {
  closeMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ closeMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { logout, isPending, error } = useLogoutUser();

  const handleLogout = async () => {
    await logout();
    dispatch(userActions.logout());
    navigate("/login");
  };

  return (
    <div className='bg-customOrange absolute right-4 mt-2 rounded-xl w-60 py-2 px-5 shadow-md z-10'>
      <NavLink
        to='/accountsettings'
        onClick={closeMenu}
        className={`hover:bg-lightCustomOrange w-full flex justify-start rounded-md px-2 ${
          isPending ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        Account Settings
      </NavLink>

      <button
        className={`hover:bg-lightCustomOrange w-full flex justify-start rounded-md px-2 ${
          isPending ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={handleLogout}
        disabled={isPending}
      >
        {isPending ? (
          <div className='flex items-center gap-2'>
            <div className='animate-spin'>
              <FaSpinner />
            </div>
            <p>Loging-out</p>
          </div>
        ) : (
          <p>Logout</p>
        )}
      </button>

      {error instanceof AxiosError && error.response ? (
        <p className='text-center capitalize text-red-500'>
          {error.response.data?.error || "An error occurred"}
        </p>
      ) : (
        error && (
          <p className='text-center capitalize text-red-500'>
            Something went wrong
          </p>
        )
      )}
    </div>
  );
};

export default Menu;
