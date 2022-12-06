import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Anchor from "../../utilitize/Anchor";
import Footer from "../ShareComponent/Footer/Footer";

const MyAccount = () => {
  const [acMenu, setAcMenu] = useState(true);
  const router = useLocation();
  const navigate = useNavigate();

  const handleAcMenu = () => {
    if (acMenu) {
      setAcMenu(false);
    } else {
      setAcMenu(true);
    }
  };
  useEffect(() => {
    if (window.innerWidth < 480) {
      setAcMenu(false);
    } else {
      setAcMenu(true);
    }
  }, []);

  useEffect(() => {
    if (router.pathname === "/my-account") {
      navigate("/my-account/profile");
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <div>
      <i
        onClick={handleAcMenu}
        className={`${acMenu && "hidden"} togglebar fas fa-caret-square-right`}
      />
      <div className='md:grid grid-cols-6 gap-2 min-h-full'>
        <div className={`${!acMenu && "close"}  menubar`}>
          <i
            onClick={handleAcMenu}
            className={`${!acMenu && "hidden"} closebtn fas fa-times`}
          ></i>
          <div className='myaccount-menus'>
            <Anchor to='profile'>My Profile</Anchor>
            <Anchor to='my-order'>My Order</Anchor>
            <Anchor to='view-cart'>View Cart</Anchor>
            <Anchor to='my-review'>My Review</Anchor>
            <Anchor to='payment'>Payment</Anchor>
          </div>
        </div>
        <div className='outlet'>
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
