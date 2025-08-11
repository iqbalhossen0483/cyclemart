import { Outlet, Route, Routes, useLocation } from "react-router-dom";
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
    <div className="h-screen overflow-auto scrollbar bg-gray-100">
      <FirebaseProvider>
        <FunctionProvider>
          <Header />
          <Routes>
            {/* ---------
              public route 
            ---------------*/}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<CategoryProduct />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/news" element={<News />} />

            {/* -------------
              private route
            -----------------*/}

            <Route
              path="/place-order/:id"
              element={
                <PrivateRoute>
                  <Purchase />
                </PrivateRoute>
              }
            />

            <Route
              element={
                <PrivateRoute>
                  <Outlet />
                </PrivateRoute>
              }
            >
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/my-account/profile" element={<Profile />} />
              <Route
                path="/my-account/update-profile"
                element={<UpdateProfile />}
              />
              <Route path="/my-account/my-order" element={<MyOrder />} />
              <Route path="/my-account/my-review" element={<MyReview />} />
              <Route path="/my-account/add-review" element={<AddReviews />} />
              <Route path="/my-account/payment" element={<PaymentMathods />} />
              <Route path="/my-account/view-cart" element={<ViewCart />} />
            </Route>

            {/* -------------
              Admin route
            -----------------*/}
            <Route
              element={
                <CheckAdmin>
                  <Outlet />
                </CheckAdmin>
              }
            >
              <Route path="/admin" element={<Desboard />} />
              <Route path="/admin/customize" element={<Customize />} />
              <Route path="/admin/add-product" element={<AddProduct />} />
              <Route path="/admin/add-news" element={<AddNews />} />
              <Route path="/admin/manage-order" element={<ManageOrder />} />
              <Route path="/admin/make-admin" element={<MakeAdmin />} />
              <Route path="/admin/manage-product" element={<ManageProduct />} />
              <Route
                path="/admin/updateProduct/:id"
                element={<UpdateProduct />}
              />
            </Route>

            <Route path="/log-in" element={<LogIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {!/^\/admin|^\/my-account|\/shop/.test(router.pathname) && <Footer />}
        </FunctionProvider>
      </FirebaseProvider>
    </div>
  );
}

export default App;
