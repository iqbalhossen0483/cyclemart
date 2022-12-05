import React, { useEffect, useState } from "react";
import useFirebase from "../../Hook/useFirebase";
import MobileView from "./component/MobileView";
import TopContact from "./component/TopContact";
import SearchBar from "./component/SearchBar";
import TopMenus from "./component/TopMenus";
import useFunc from "../../Hook/useFunc";
import CartProduct from "./component/CartProduct";
import Logo from "./component/Logo";
import UserInfo from "./component/UserInfo";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { addedProduct } = useFunc();
  const { hideUserInfo, setHideUserInfo, showCart, setShowCart } =
    useFirebase();

  const toggleShow = () => {
    if (hideUserInfo) {
      setHideUserInfo(false);
    } else {
      setHideUserInfo(true);
    }
  };

  const handleMenu = () => {
    if (menu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  };
  useEffect(() => {
    if (window.innerWidth < 480) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  }, []);

  return (
    <>
      {/* mobile views */}
      <MobileView handleMenu={handleMenu} toggleShow={toggleShow} />
      <div className={`${!menu && "close"} header-menu`}>
        {/* logo section */}
        <Logo />

        {/* top contact info */}
        <TopContact />

        {/* search bar */}
        <div className='hidden md:block col-span-2'>
          <SearchBar />
        </div>

        {/* menus */}
        <TopMenus setShowCart={setShowCart} toggleShow={toggleShow} />

        {/* user info  */}
        {hideUserInfo && <UserInfo />}
        {showCart && addedProduct?.length > 0 && <CartProduct />}
      </div>
    </>
  );
};

export default Header;
