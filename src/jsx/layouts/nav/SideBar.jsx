import React, { useReducer, useContext, useEffect, useState } from "react";
import { Collapse } from 'react-bootstrap';
/// Link
import { Link } from "react-router-dom";
import { MenuList } from './Menu';

import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import SidebarExtraContent from "./SidebarExtraContent";
import { useDispatch } from "react-redux";
import { navtoggle } from "../../../store/actions/AuthActions";
import axiosInstance from "../../../services/AxiosInstance";
import { useNavigate } from "react-router-dom";

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "",
  activeSubmenu: "",
}

const SideBar = () => {
  let Latest = new Date();
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
    ChangeIconSidebar,
  } = useContext(ThemeContext);

  const [state, setState] = useReducer(reducer, initialState);

  const [hideOnScroll, setHideOnScroll] = useState(true)
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll]
  )


  const handleMenuActive = status => {
    setState({ active: status });
    if (state.active === status) {
      setState({ active: "" });
    }
  }
  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status })
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" })
    }
  }
  const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);


  const dispatch = useDispatch();
  const handleToogle = () => {
    if (width <= 768) {
      dispatch(navtoggle());
    }
  };

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  useEffect(() => {
    MenuList.forEach((data) => {
      data.content?.forEach((item) => {
        if (path === item.to) {
          setState({ active: data.title })
        }
        item.content?.forEach(ele => {
          if (path === ele.to) {
            setState({ activeSubmenu: item.title, active: data.title })
          }
        })
      })
    })
  }, [path]);


  const [me, setMe] = useState(null)


	const fetchMe = async () => {

		try{
			const token = localStorage.getItem('token')
			if(token){
					const response = await axiosInstance.get("/api/user/me", {
						headers: {
						Authorization: `Bearer ${token}`,
						},
					});

					setMe(response.data.user)
				}
		} catch (error) {
			// do nothing
			console.log(error)
		}
  

	}

	useEffect(() => {
		fetchMe();
	}, [])

  console.log(me?.isAdmin)
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
};

  return (
    <div
      onMouseEnter={() => ChangeIconSidebar(true)}
      onMouseLeave={() => ChangeIconSidebar(false)}
      className={`dlabnav ${path === "dashboard" || path === "index-2" ? 'follow-info' : ''} ${iconHover} ${sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
        ? hideOnScroll > 120
          ? "fixed"
          : ""
        : ""
        }`}
    >

      {/* <span className="main-menu">Main Menu</span> */}
      <div className="menu-scroll">
        <div className="dlabnav-scroll">

          {/* <Link to="/upgrade" className="upgrade">
            UPGRADE
          </Link> */}
          <ul className="metismenu" id="menu">
            {MenuList.map((data, index) => {
              console.log(data.isAdmin, me?.isAdmin)
              if(data.isAdmin && (me?.isAdmin || 0) === 0){
                return
              }

              if (data.title === "Logout") {
                return (
                  <li key={index} className="">
                    <button onClick={onLogout} className="btn-logout btn-logout-02">
                      {data.iconStyle}
                      <span className="nav-text">{data.title}</span>
                    </button>
                  </li>
                );
              }
              
              let menuClass = data.classsChange;
              if (menuClass === "menu-title") {
                return (
                  <li className={`nav-label ${menuClass}`} key={index} >{data.title}</li>
                )
              } else {
                return (
                  <li className={` ${state.active === data.title ? 'mm-active' : ''}${data.to === path ? 'mm-active' : ''}`}
                    key={index}
                  >
                    {data.content && data.content.length > 0 ?
                      <>
                        <Link to={"#"}
                          className="has-arrow"
                          onClick={() => { handleMenuActive(data.title) }}
                        >
                          {data.iconStyle}
                          <span className="nav-text">{data.title}</span>
                          <span className="badge badge-xs style-1 badge-danger">{data.update}</span>
                        </Link>
                        <Collapse in={state.active === data.title ? true : false}>
                          <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                            {data.content && data.content.map((data, index) => {
                              return (
                                <li key={index}
                                  className={`${state.activeSubmenu === data.title ? "mm-active" : ""}${data.to === path ? 'mm-active' : ''}`}
                                >
                                  {data.content && data.content.length > 0 ?
                                    <>
                                      <Link to={data.to} className={data.hasMenu ? 'has-arrow' : ''}
                                        onClick={() => { handleSubmenuActive(data.title) }}
                                      >
                                        {data.title}
                                      </Link>
                                      <Collapse in={state.activeSubmenu === data.title ? true : false}>
                                        <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                          {data.content && data.content.map((data, index) => {
                                            return (
                                              <li key={index}>
                                                <Link className={`${path === data.to ? "mm-active" : ""}`} to={data.to}>{data.title}</Link>
                                              </li>
                                            )
                                          })}
                                        </ul>
                                      </Collapse>
                                    </>
                                    :
                                    <Link to={data.to}
                                      className={`${data.to === path ? 'mm-active' : ''}`}
                                    >
                                      {data.title}
                                    </Link>
                                  }
                                </li>
                              )
                            })}
                          </ul>
                        </Collapse>
                      </>
                      :
                      <Link onClick={() => {handleToogle()}} to={data.to} className={`${data.to === path ? 'mm-active' : ''}`}>
                        {data.iconStyle}
                        <span className="nav-text">{data.title}</span>
                      </Link>
                    }
                  </li>
                )
              }
            })}
          </ul>
          <div className="copyright">
            <p><strong>CWE Booster</strong> © <span className="current-year">{Latest.getFullYear()}</span> All Rights Reserved</p>

          </div>
        </div>
      </div>


    </div>
  );
};

export default SideBar;
