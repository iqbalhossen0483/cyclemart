import React from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';

const Massenger = () => {
    return (
        <div>
            <MessengerCustomerChat
                pageId={process.env.REACT_APP_PAGE_ID}
                appId={process.env.REACT_APP_APP_ID}
            />,
        </div>
    );
};

export default Massenger;