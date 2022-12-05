import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Anchor from '../../../utilitize/Anchor';
import Footer from '../../ShareComponent/Footer/Footer';

const Desboard = () => {
    const [dsMenu, setDsMenu] = useState(true);

    const handleDsMenu = () => {
        if (dsMenu) {
            setDsMenu(false);
        } else {
            setDsMenu(true);
        }
    }
    useEffect(() => {
        if (window.innerWidth < 480) {
            setDsMenu(false);
        } else {
            setDsMenu(true);
        }
    }, []);

    return (
        <div className="md:grid grid-cols-6 gap-2">
            <i
                onClick={handleDsMenu}
                className={`${dsMenu && "hidden"} togglebar fas fa-caret-square-right`}>
            </i>
            <div
                className={`${!dsMenu && "close"} menubar w-2/4 md:w-full`}>
                <i
                    onClick={handleDsMenu}
                    className={`${!dsMenu && "hidden"} closebtn fas fa-times`}>
                </i>
                
                <div
                    className='flex flex-col pt-10 px-5'>
                    <Anchor to='add-product'>Add-Product</Anchor>
                    <Anchor to='add-news'>Add-News</Anchor>
                    <Anchor to='customize'>Customize</Anchor>
                    <Anchor to='manage-order'>Manage-Order</Anchor>
                    <Anchor to='manage-product'>Manage-Product</Anchor>
                    <Anchor to='make-admin'>Make-Admin</Anchor>
                </div>
            </div>
            <div className="outlet">
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default Desboard;