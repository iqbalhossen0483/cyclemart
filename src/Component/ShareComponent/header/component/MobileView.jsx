import React, { useEffect, useReducer, useRef } from "react";
import useFirebase from "../../../Hook/useFirebase";
import useFunc from "../../../Hook/useFunc";
import CartProduct from "./CartProduct";
import SearchBar from "./SearchBar";
import TopMenus from "./TopMenus";
import UserInfo from "./UserInfo";
const init = {
  userInfo: false,
  showCart: false,
};
function reducer(state, action) {
  switch (action) {
    case "user":
      return { userInfo: true, showCart: false, menu: false };
    case "cart":
      return { userInfo: false, showCart: true, menu: false };
    case "menu":
      return { userInfo: false, showCart: false, menu: true };
    default:
      return { userInfo: false, showCart: false, menu: false };
  }
}

const MobileView = () => {
  const [state, dispatch] = useReducer(reducer, init);
  const { addedProduct } = useFunc();
  const { user } = useFirebase();
  const mobile = useRef(null);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!mobile.current?.contains(e.target)) {
        dispatch("");
      }
    });
  }, []);

  useEffect(() => {
    if (!user.email) dispatch("");
  }, [user]);

  return (
    <div ref={mobile} className='header-mobile header-bg'>
      <i
        onClick={() => dispatch("menu")}
        className='fas fa-bars text-gray-200'
      />
      <div className='col-span-2'>
        <SearchBar />
      </div>
      <div className='flex items-center col-span-2 justify-end'>
        {user.email && (
          <div className='text-xl mx-2'>
            <i
              onClick={() => dispatch("cart")}
              className='fas fa-shopping-cart'
            ></i>
            <span className='text-purple-900 font-semibold ml-1'>
              {addedProduct?.length}
            </span>
          </div>
        )}
        {user.email && (
          <img
            onClick={() => dispatch("user")}
            className='w-10 h-10 rounded-full ml-2'
            src={user.imgUrl ? user.imgUrl : "/no-photo.png"}
            alt=''
          />
        )}
        {/* menus */}
        {state.menu && <TopMenus dispatch={dispatch} />}
        {/* user info  */}
        {state.userInfo && <UserInfo />}
        {state.showCart && addedProduct?.length > 0 && <CartProduct />}
      </div>
    </div>
  );
};

export default MobileView;
