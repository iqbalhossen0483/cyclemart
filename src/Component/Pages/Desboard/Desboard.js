import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Anchor from "../../../utilitize/Anchor";
import Footer from "../../ShareComponent/Footer/Footer";

const Desboard = () => {
  const [dsMenu, setDsMenu] = useState(false);
  const router = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 480) setDsMenu(false);
    });
  }, []);

  useEffect(() => {
    if (router.pathname === "/admin") {
      navigate("/desboard/add-product");
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <div className='md:flex gap-2'>
      <i
        onClick={() => setDsMenu((prev) => !prev)}
        className='togglebar fas fa-caret-square-right'
      />
      <div
        className={`${
          dsMenu
            ? "absolute top-14 left-0 w-max pr-3"
            : "hidden md:block md:relative  md:w-[300px] lg:w-[200px]"
        } menubar`}
      >
        <i onClick={() => setDsMenu(false)} className='closebtn fas fa-times' />

        <div className='myaccount-menus'>
          <Anchor to='add-product'>Add Product</Anchor>
          <Anchor to='add-news'>Add News</Anchor>
          <Anchor to='customize'>Customize</Anchor>
          <Anchor to='manage-order'>Manage Order</Anchor>
          <Anchor to='manage-product'>Manage Product</Anchor>
          <Anchor to='make-admin'>Make Admin</Anchor>
        </div>
      </div>
      <div>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Desboard;
