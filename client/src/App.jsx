import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/user/userContext";

// components
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";

// pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import EachProduct from "./pages/EachProduct";
import Blog from "./pages/Blog";
import Account from "./pages/Account";
import ForgotPassword from "./pages/ForgotPassword";
import HowToPostAPlant from "./pages/HowToPostAPlant";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Failure from "./pages/payment/Failure";
import Success from "./pages/payment/Success";
import ScrollToTop from "./components/shared/ScrollToTop";



export default function App() {
  return (
    <UserProvider>
      <ChakraProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/products/:id" element={<EachProduct />} />
            <Route path="/account" element={<Account />} />
            <Route path="/payment/success" element={<Success />} />
            <Route path="/payment/failure" element={<Failure />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/how-to-post-a-pant" element={<HowToPostAPlant />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
          <ScrollToTop />
        </Router>
        <ToastContainer />
      </ChakraProvider>
    </UserProvider>
  );
}


