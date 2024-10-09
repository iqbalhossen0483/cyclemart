import React from "react";
import { Route, Routes, useLocation } from "react-router";
import FunctionProvider from "./AllProvider/FunctionProvider";
import "./App.css";
import FirebaseProvider from "./Component/Firebase/FirebaseProvider";
import LogIn from "./Component/Firebase/LogIn";
import SignUp from "./Component/Firebase/SignUp";
import AddNews from "./Component/Pages/Desboard/AddNews";
import AddReviews from "./Component/Pages/Desboard/AddReviews";
import CheckAdmin from "./Component/Pages/Desboard/CheckAdmin";
import Desboard from "./Component/Pages/Desboard/Desboard";
import MakeAdmin from "./Component/Pages/Desboard/MakeAdmin";
import ManageOrder from "./Component/Pages/Desboard/ManageOrder";
import ManageProduct from "./Component/Pages/Desboard/ManageProduct";
import AddProduct from "./Component/Pages/Desboard/addProduct/AddProduct";
import Customize from "./Component/Pages/Desboard/customize/Customize";
import UpdateProduct from "./Component/Pages/Desboard/updateProduct/UpdateProduct";
import Home from "./Component/Pages/Home/Home";
import News from "./Component/Pages/News/News";
import NotFound from "./Component/Pages/NotFound";
import CategoryProduct from "./Component/Pages/Shop/CategoryProduct";
import Shop from "./Component/Pages/Shop/Shop";
import ProductDetails from "./Component/Pages/productDetails/ProductDetails";
import Purchase from "./Component/Pages/purchase/Purchase";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import Footer from "./Component/ShareComponent/Footer/Footer";
import Header from "./Component/ShareComponent/header/Header";
import MyAccount from "./Component/user/MyAccount";
import MyOrder from "./Component/user/MyOrder";
import MyReview from "./Component/user/MyReview";
import PaymentMathods from "./Component/user/PaymentMathods";
import Profile from "./Component/user/Profile";
import UpdateProfile from "./Component/user/UpdateProfile";
import ViewCart from "./Component/user/ViewCart";

function App() {
  const router = useLocation();

  return (
    <div className='h-screen overflow-auto scrollbar bg-gray-100'>
      <FirebaseProvider>
        <FunctionProvider>
          <Header />
          <Routes>
            {/* ---------
              public route 
            ---------------*/}
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/shop/:category' element={<CategoryProduct />} />
            <Route path='/products/:id' element={<ProductDetails />} />
            <Route path='/news' element={<News />} />

            {/* -------------
              private route
            -----------------*/}

            <Route
              path='/place-order/:id'
              element={<PrivateRoute element={<Purchase />} />}
            />

            <Route
              path='/my-account'
              element={<PrivateRoute element={<MyAccount />} />}
            >
              <Route
                path='profile'
                element={<PrivateRoute element={<Profile />} />}
              />
              <Route
                path='update-profile'
                element={<PrivateRoute element={<UpdateProfile />} />}
              />
              <Route
                path='my-order'
                element={<PrivateRoute element={<MyOrder />} />}
              />
              <Route
                path='my-review'
                element={<PrivateRoute element={<MyReview />} />}
              />
              <Route
                path='add-review'
                element={<PrivateRoute element={<AddReviews />} />}
              />
              <Route
                path='payment'
                element={<PrivateRoute element={<PaymentMathods />} />}
              />
              <Route
                path='view-cart'
                element={<PrivateRoute element={<ViewCart />} />}
              />
            </Route>

            {/* -------------
              Admin route
            -----------------*/}

            <Route
              path='/admin'
              element={<CheckAdmin element={<Desboard />} />}
            >
              <Route
                path='customize'
                element={<CheckAdmin element={<Customize />} />}
              />
              <Route
                path='add-product'
                element={<CheckAdmin element={<AddProduct />} />}
              />
              <Route
                path='add-news'
                element={<CheckAdmin element={<AddNews />} />}
              />
              <Route
                path='manage-order'
                element={<CheckAdmin element={<ManageOrder />} />}
              />
              <Route
                path='make-admin'
                element={<CheckAdmin element={<MakeAdmin />} />}
              />
              <Route
                path='manage-product'
                element={<CheckAdmin element={<ManageProduct />} />}
              />
              <Route path='updateProduct/:id' element={<UpdateProduct />} />
            </Route>

            <Route path='/log-in' element={<LogIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          {!/^\/admin|^\/my-account|\/shop/.test(router.pathname) && <Footer />}
        </FunctionProvider>
      </FirebaseProvider>
    </div>
  );
}

export default App;
