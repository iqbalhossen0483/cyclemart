import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Anchor from "../../../utilitize/Anchor";
import Footer from "../../ShareComponent/Footer/Footer";

const Desboard = () => {
  const [dsMenu, setDsMenu] = useState(true);
  const router = useLocation();
  const navigate = useNavigate();

  const handleDsMenu = () => {
    if (dsMenu) {
      setDsMenu(false);
    } else {
      setDsMenu(true);
    }
  };
  useEffect(() => {
    if (window.innerWidth < 480) {
      setDsMenu(false);
    } else {
      setDsMenu(true);
    }
  }, []);

  useEffect(() => {
    if (router.pathname === "/desboard") {
      navigate("/desboard/add-product");
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <div className='flex gap-2'>
      <i
        onClick={handleDsMenu}
        className={`${dsMenu && "hidden"} togglebar fas fa-caret-square-right`}
      />
      <div
        className={`${
          !dsMenu && "close"
        } menubar relative md:w-[300px] lg:w-[200px]`}
      >
        <i
          onClick={handleDsMenu}
          className={`${!dsMenu && "hidden"} closebtn fas fa-times`}
        />

        <div className='flex flex-col fixed top-20 left-2 pt-10 px-5 space-y-2'>
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
