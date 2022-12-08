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

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 480) setAcMenu(false);
    });
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
        onClick={() => setAcMenu((prev) => !prev)}
        className='togglebar fas fa-caret-square-right'
      />
      <div className='md:flex gap-1'>
        <div
          className={`${
            acMenu
              ? "absolute top-14 left-0 w-max pr-3"
              : "hidden md:block md:relative  md:w-[300px] lg:w-[200px]"
          } menubar`}
        >
          <i
            onClick={() => setAcMenu(false)}
            className='closebtn fas fa-times'
          />
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
