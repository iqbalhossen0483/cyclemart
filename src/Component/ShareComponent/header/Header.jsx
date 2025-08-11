import React, { useEffect, useReducer, useRef } from "react";
import MobileView from "./component/MobileView";
import TopContact from "./component/TopContact";
import SearchBar from "./component/SearchBar";
import TopMenus from "./component/TopMenus";
import useFunc from "../../Hook/useFunc";
import CartProduct from "./component/CartProduct";
import Logo from "./component/Logo";
import UserInfo from "./component/UserInfo";
import useFirebase from "../../Hook/useFirebase";
const init = {
  userInfo: false,
  showCart: false,
};
function reducer(state, action) {
  switch (action) {
    case "user":
      return { userInfo: true, showCart: false };
    case "cart":
      return { userInfo: false, showCart: true };
    default:
      return { userInfo: false, showCart: false };
  }
}

const Header = () => {
  const [state, dispatch] = useReducer(reducer, init);
  const { addedProduct } = useFunc();
  const header = useRef(null);
  const { user } = useFirebase();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!header.current?.contains(e.target)) {
        dispatch("");
      }
    });
  }, []);
  useEffect(() => {
    if (!user.email) dispatch("");
  }, [user]);

  return (
    <>
      {/* mobile views */}
      <MobileView />
      <div ref={header} className='header-menu'>
        {/* logo section */}
        <Logo />

        {/* top contact info */}
        <TopContact />

        {/* search bar */}
        <div className='hidden md:block col-span-2'>
          <SearchBar />
        </div>

        {/* menus */}
        <TopMenus dispatch={dispatch} />
        {/* user info  */}
        {state.userInfo && <UserInfo />}
        {state.showCart && addedProduct?.length > 0 && <CartProduct />}
      </div>
    </>
  );
};

export default Header;
