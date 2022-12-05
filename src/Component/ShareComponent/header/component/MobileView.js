import React from "react";
import useFirebase from "../../../Hook/useFirebase";
import useFunc from "../../../Hook/useFunc";
import SearchBar from "./SearchBar";

const MobileView = ({ handleMenu, toggleShow }) => {
  const { user, setShowCart } = useFirebase();
  const { addedProduct } = useFunc();
  return (
    <div className='header-mobile header-bg'>
      <i onClick={handleMenu} className='fas fa-bars text-gray-200'></i>
      <div className='col-span-2'>
        <SearchBar />
      </div>
      <div className='flex items-center col-span-2 justify-end'>
        {user.email && (
          <div className='text-xl mx-2'>
            <i
              onMouseEnter={() => {
                setShowCart(true);
              }}
              className='fas fa-shopping-cart'
            ></i>
            <span className='text-purple-900 font-semibold ml-1'>
              {addedProduct?.length}
            </span>
          </div>
        )}
        {user.email && (
          <img
            onClick={toggleShow}
            className='w-10 h-10 rounded-full ml-2'
            src={
              user.imgUrl
                ? user.imgUrl
                : user.photoURL
                ? user.photoURL
                : "https://res.cloudinary.com/dpphyosn4/image/upload/v1642742699/cycle-mart/users/nophoto_elhi6z.png"
            }
            alt=''
          />
        )}
      </div>
    </div>
  );
};

export default MobileView;
