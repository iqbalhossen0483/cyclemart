import {
  House,
  ShoppingBag,
  ShoppingCart,
  SquareUserRound,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useFirebase from "../../../Hook/useFirebase";
import useFunc from "../../../Hook/useFunc";

const TopMenus = ({ dispatch }) => {
  const { addedProduct } = useFunc();
  const { user } = useFirebase();
  const location = useLocation();

  const menus = [
    {
      name: "Home",
      link: "/",
      icon: House,
      authenticated: false,
    },
    {
      name: "Shop",
      link: "/shop",
      icon: ShoppingBag,
      authenticated: false,
    },
    {
      name: "Account",
      link: "/log-in",
      icon: SquareUserRound,
      authenticated: true,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {menus.map((menu, index) => {
        if (user.email && menu.authenticated) return null;
        return (
          <div key={index}>
            <Link
              to={menu.link}
              className={`flex items-center gap-1 font-[500] ${
                location.pathname === menu.link
                  ? "text-cyan-600"
                  : "hover:text-cyan-700"
              }`}
            >
              <menu.icon size={18} />
              {menu.name}
            </Link>
          </div>
        );
      })}

      {user.email && (
        <button onClick={() => dispatch("cart")} className="relative">
          <ShoppingCart />
          <span className="absolute -top-3 -right-2 bg-cyan-600 text-white size-5 flex justify-center items-center rounded-full font-semibold">
            {addedProduct?.length}
          </span>
        </button>
      )}

      {user.email && (
        <img
          onClick={() => dispatch("user")}
          className="w-8 h-8 rounded-full ml-2 cursor-pointer"
          src={user.imgUrl ? user.imgUrl : "/no-photo.png"}
          alt=""
        />
      )}
    </div>
  );
};

export default TopMenus;
