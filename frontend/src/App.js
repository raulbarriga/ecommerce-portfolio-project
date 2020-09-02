import React, { useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw
} from "@fortawesome/free-solid-svg-icons";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import { urlencoded } from 'body-parser';
//import {pawLogo} from '../public/images/paw-logo'

//const useComponentDidMount = func => useEffect(func, []);

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    // Look for .hamburger
    var hamburger = document.querySelector(".hamburger");
    var closeHamburger = document.querySelector(".sidebar-close-button");
    // On click
    hamburger.addEventListener("click", function () {
      // Toggle class "is-active" and open sidemenu
      hamburger.classList.toggle("is-active");

    });
    closeHamburger.addEventListener("click", function () {
      // close sidemenu
      hamburger.classList.toggle('is-active');
    })
    return () => {
      //
    };
  }, []);

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button className="hamburger hamburger--squeeze" onClick={openMenu}>
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>
            <Link to="/">
              P<FontAwesomeIcon
                className="fas"
                icon={faPaw}
              />
              <FontAwesomeIcon
                className="fas"
                icon={faPaw}
              />ch R Us
            </Link>
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
                <Link to="/signin">Sign In</Link>
              )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            <li>
              <Link to="/category/toys">Toys</Link>
            </li>

            <li>
              <Link to="/category/bedsAndFurniture">Beds & Furniture</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
