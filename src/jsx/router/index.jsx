import { useContext, useEffect } from "react";
import { Routes, Route, Outlet, useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
/// Css
import './../index.css'
import './../chart.css'
import './../step.css'

/// Layout
import Nav from './../layouts/nav'
import Footer from './../layouts/Footer'
import { ThemeContext } from "../../context/ThemeContext";
//Scroll To Top
import ScrollToTop from './../layouts/ScrollToTop';

/// Dashboard
import Home from "./../pages/dashboard/Home";
import DashboardDark from "./../pages/dashboard/DashboardDark";

import EmptyPage from "./../pages/dashboard/EmptyPage";
/// Pages
import LockScreen from './../pages/error/LockScreen'
import Error400 from './../pages/error/Error400'
import Error403 from './../pages/error/Error403'
import Error404 from './../pages/error/Error404'
import Error500 from './../pages/error/Error500'
import Error503 from './../pages/error/Error503'
import RightWalletBar from "../layouts/nav/RightWalletBar";
import { ToastContainer } from "react-toastify";
import PublicPage from '../pages/publicpage/PublicPage'


import Login from "./../pages/authentication/Login";
import Registration from "./../pages/authentication/Registration";

import Exchanges from "../pages/Exchanges";
import Trading from "../pages/Trading";
import Upgrade from "../pages/Upgrade";
import Network from "../pages/Network";
import Users from "../pages/Users";
import Sales from "../pages/Sales";

const Markup = () => {
  const allroutes = [
    { url: "trading", component: <Trading /> },
    { url: "exchanges", component: <Exchanges /> },
    { url: "upgrade", component: <Upgrade /> },
    { url: "network", component: <Network /> },
    { url: "users", component: <Users /> },
    { url: "sales", component: <Sales /> },
    { url: "empty-page", component: <EmptyPage /> },
  ]

  const token = localStorage.getItem('token');

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register/:referralId' element={<Registration />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/page-lock-screen' element={<LockScreen />} />
        <Route path='/page-error-400' element={<Error400 />} />
        <Route path='/page-error-403' element={<Error403 />} />
        <Route path='/page-error-404' element={<Error404 />} />
        <Route path='/page-error-500' element={<Error500 />} />
        <Route path='/page-error-503' element={<Error503 />} />
        {token ? (
          <Route element={<MainLayout />}>
            <Route path='/' element={<Navigate to="/dashboard" replace />} />
            <Route path='/dashboard' element={<Home />} />
            <Route path='/index-2' element={<DashboardDark />} />
          </Route>
        ) : (
          <Route path='/' element={<PublicPage />} />
        )}
        <Route element={<MainLayout2 />} >
          {allroutes.map((data, i) => (
            <Route
              key={i}
              exact
              path={`${data.url}`}
              element={data.component}
            />
          ))}
        </Route>
      </Routes>
      <ScrollToTop />
    </>
  )
}

function MainLayout() {
  const { sidebariconHover, headWallet } = useContext(ThemeContext);
  const sideMenu = useSelector(state => state.sideMenu);

  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
        navigate('/login')
    }
  }, [navigate]);

  return (
    <>
      <div id="main-wrapper"
        className={`show wallet-open ${headWallet ? "" : 'active'} ${sidebariconHover ? "iconhover-toggle" : ""} ${sideMenu ? "menu-toggle" : ""}`}
      >
        <Nav />
        <div className="content-body" >
          <div className="container-fluid" style={{ minHeight: window.screen.height - 45 }}>
          <ToastContainer />
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
};
function MainLayout2() {
  const { sidebariconHover } = useContext(ThemeContext);
  const sideMenu = useSelector(state => state.sideMenu);

  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
        navigate('/login')
    }
  }, [navigate]);

  return (
    <>
      <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${sideMenu ? "menu-toggle" : ""}`}>
        <Nav />
        <div className="content-body" >
          <div className="container-fluid" style={{ minHeight: window.screen.height - 45 }}>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
};

export default Markup;