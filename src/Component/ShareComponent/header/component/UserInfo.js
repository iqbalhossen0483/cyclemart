import useFirebase from "../../../Hook/useFirebase";
import { NavLink } from "react-router-dom";
import React from "react";

const UserInfo = () => {
  const { user, isAdmin, lognOut, setHideUserInfo } = useFirebase();

  return (
    <div className='userInfo-container'>
      <div>
        <p className='font-medium'>{user?.displayName?.toUpperCase()}</p>
        <p className='hidden md:block'>{user.email}</p>
        {isAdmin && <p className='font-medium text-sm'>Adminstator</p>}
      </div>
      <hr className='mt-3' />
      <div className='mt-4 mb-2 text-white flex justify-evenly'>
        {isAdmin && (
          <NavLink
            onClick={() => {
              setHideUserInfo(false);
            }}
            className='button'
            to='/desboard/add-product'
          >
            Desboard
          </NavLink>
        )}
        <NavLink
          onClick={() => {
            setHideUserInfo(false);
          }}
          className='button'
          to='/my-account/profile'
        >
          Profile
        </NavLink>
        <button onClick={lognOut} className='button'>
          <i className='fas fa-sign-out-alt'></i>
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
