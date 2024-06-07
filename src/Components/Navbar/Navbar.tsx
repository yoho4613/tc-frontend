import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineLoading3Quarters, AiOutlineStar } from "react-icons/ai";
import { PiShoppingBagOpenLight } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import { RiMenu2Fill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import Searchbar from "../Search/Searchbar";
import LoginButton from "../Buttons/LoginButton";
import LogoutButton from "../Buttons/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { NAV_MANU } from "../../constant/config";

const Navbar = () => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [profileOpened, setProfileOpened] = useState(false);
  const [category, setCategory] = useState("all");
  const popupRef = useRef<HTMLUListElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    setCategory(searchParam.get("category") || "all");
    // const token = getAccessTokenSilently().then((res) => console.log(res));
  }, [searchParam]);

  useEffect(() => {
    console.log(user);
    console.log(isAuthenticated);
  }, [user]);

  return (
    <nav className="relative flex max-w-full items-center justify-between px-2 sm:px-4 py-2 text-gray-700 ">
      <div className="md:w-1/3 ">
        <button
          className="flex items-center md:hidden"
          onClick={() => setMobileMenuOpened((prev) => !prev)}
        >
          <RiMenu2Fill className="text-2xl sm:text-3xl" />
        </button>

        <ul
          ref={popupRef}
          className={`absolute left-0 top-16 z-50 flex h-screen w-full flex-col bg-[rgba(0,0,0,0.6)] text-lg transition md:relative md:top-0  md:h-auto md:translate-x-0 md:flex-row md:justify-between md:bg-transparent md:transition-none ${
            mobileMenuOpened ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {NAV_MANU.map((menu) => (
            <li
              key={menu.path}
              className="hover-underline-animation bg-slate-200 p-2.5 md:bg-transparent md:p-0"
            >
              <Link
                onClick={() => setMobileMenuOpened(false)}
                className="inline-block w-full"
                to={menu.path}
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-end gap-4 grow">
        <div className="relative mr-2 ml-2 w-full border rounded-md text-xs md:mr-6 md:w-64 ">
          <Searchbar category={category} />
        </div>
        <div className="relative flex gap-1 items-center">
          <div className="flex items-center">
            {/* {isLoading ? (
              <div>
                <AiOutlineLoading3Quarters />
              </div>
            ) : isAuthenticated ? (
              <>
                {user && (
                  <button onClick={() => setProfileOpened((prev) => !prev)}>
                    {user.picture ? (
                      <img
                        src={user.picture || ""}
                        alt="avatar"
                        width={100}
                        height={100}
                        className="w-6 rounded-full sm:w-6"
                      />
                    ) : (
                      <RxAvatar
                        color="#57f542"
                        className="text-lg sm:text-2xl"
                      />
                    )}
                  </button>
                )}
              </>
            ) : (
              <LoginButton />
            )} */}
          </div>
          {profileOpened && (
            <div
              ref={profileRef}
              className="absolute right-0 top-6 z-[999] flex w-44 flex-col rounded-sm px-2.5 text-sm text-white sm:w-[20rem] sm:text-lg"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <Link
                to="/user/profile"
                className="flex w-full items-center p-2 text-left"
              >
                <BsPerson color="white" className="mr-2 text-xl" />
                Manage My Profile
              </Link>
              <Link
                to="/user/order"
                className="flex w-full items-center p-2 text-left"
              >
                <PiShoppingBagOpenLight
                  color="white"
                  className="mr-2 text-xl"
                />
                My Capsules
              </Link>
              <Link to="/" className="flex w-full items-center p-2 text-left">
                <AiOutlineStar color="white" className="mr-2 text-xl" />
                My Wallet
              </Link>
              <div className="flex w-full items-center p-2 text-left">
                <BiLogOut color="white" className="mr-2 text-xl" />
                <LogoutButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
    // <nav className="bg-white h-16 flex justify-around items-center">
    //   <ul className="flex space-x-10">
    //     <li>
    //       <a href="#" className="text-gray-800 hover:text-blue-500">
    //         Home
    //       </a>
    //     </li>
    //     <li>
    //       <a href="#" className="text-gray-800 hover:text-blue-500">
    //         About
    //       </a>
    //     </li>
    //     <li>
    //       <a href="#" className="text-gray-800 hover:text-blue-500">
    //         Services
    //       </a>
    //     </li>
    //     <li>
    //       <a href="#" className="text-gray-800 hover:text-blue-500">
    //         Contact
    //       </a>
    //     </li>
    //     <li>
    //       <a href="#" className="text-gray-800 hover:text-blue-500">
    //         Login
    //       </a>
    //     </li>
    //   </ul>
    // </nav>
  );
};

export default Navbar;
