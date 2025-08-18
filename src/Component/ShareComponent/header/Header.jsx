import { useEffect, useReducer, useRef } from "react";
import { Link } from "react-router-dom";
import useFirebase from "../../Hook/useFirebase";
import useFunc from "../../Hook/useFunc";
import CartProduct from "./component/CartProduct";
import MobileView from "./component/MobileView";
import SearchBar from "./component/SearchBar";
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
      <div
        ref={header}
        className="hidden sticky top-0 bg-white border-b border-gray-300 px-10 md:flex justify-between items-center z-90"
      >
        <Link to="/">
          <div className="logo-wapper">
            <img className="size-14" src="/logo.png" alt="" />
            <span>CYCLE MART</span>
          </div>
        </Link>
        <div className="hidden md:block min-w-lg">
          <SearchBar />
        </div>
        {/* menus */}
        <TopMenus dispatch={dispatch} />
        {/* user info  */}
        {state.userInfo && <UserInfo />}
        {state.showCart && addedProduct?.length > 0 && <CartProduct />}
      </div>

      {/* mobile views */}
      <MobileView />
    </>
  );
};

export default Header;
