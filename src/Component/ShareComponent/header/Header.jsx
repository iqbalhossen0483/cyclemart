import { useEffect, useReducer, useRef } from "react";
import useFirebase from "../../Hook/useFirebase";
import useFunc from "../../Hook/useFunc";
import Logo from "./component/Logo";
import MobileView from "./component/MobileView";
import SearchBar from "./component/SearchBar";
import TopContact from "./component/TopContact";
import TopMenus from "./component/TopMenus";
import UserInfo from "./component/UserInfo";
const init = {
  userInfo: false,
  showCart: false,
};
function reducer(_state, action) {
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
      <div
        ref={header}
        className="hidden md:block py-2 bg-white border-b border-gray-300 px-10"
      >
        {/* top section */}
        <div className="flex justify-between items-center">
          <Logo />
          <TopContact />
        </div>

        <div className="flex justify-between items-center relative">
          {/* search bar */}
          <div className="hidden md:block min-w-lg">
            <SearchBar />
          </div>

          {/* menus */}
          <TopMenus dispatch={dispatch} />
          {/* user info  */}
          {state.userInfo && <UserInfo />}
          {state.showCart && addedProduct?.length > 0 && <CartProduct />}
        </div>
      </div>
    </>
  );
};

export default Header;
