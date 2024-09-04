import React, { useContext, useEffect, useState } from "react";

import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

/// Image
import profile from "../../../assets/images/user.png";
import avatar from "../../../assets/images/avatar/1.jpg";

import { ThemeContext } from "../../../context/ThemeContext";
import Logout from "../nav/Logout";
import { SVGICON } from "../../constant/theme";

const listBlog = [
  { icon: SVGICON.LtcSvgIcon, name: 'LTC in DexignLab' },
  { icon: SVGICON.BtcSvgIcon, name: 'BTC/USD in DexignLab' },
  { icon: SVGICON.EthSvgIcon, name: 'ETH/USD Dlab ' },
  { icon: SVGICON.BtcSvgIcon, name: 'BTC/USD in DexignLab' },
  { icon: SVGICON.EthSvgIcon, name: 'ETH/USD Dlab ' },
  { icon: SVGICON.LtcSvgIcon, name: 'LTC in DexignLab' },
];

const Header = ({ onNote }) => {
  const [headerFix, setheaderFix] = useState(false);

  function CommanScroll() {
    setheaderFix(window.scrollY > 50);
  }

  useEffect(() => {
    window.addEventListener("scroll", CommanScroll);
    return () => {
      window.removeEventListener("scroll", CommanScroll)
    }
  }, [])


  const { background, changeBackground,
    headWallet, setHeadWallet } = useContext(ThemeContext);
  const handleThemeMode = () => {
    if (background.value === 'dark') {
      changeBackground({ value: "dark", label: "Dark" });
    } else {
      changeBackground({ value: "dark", label: "Dark" });
    }
  }

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  const pathtitle = window.location.pathname.split("/");
  const name = pathtitle[pathtitle.length - 1].split("-");
  const filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  const finalName = filterName.includes("app")
    ? filterName.filter((f) => f !== "app")
    : filterName.includes("ui")
      ? filterName.filter((f) => f !== "ui")
      : filterName.includes("uc")
        ? filterName.filter((f) => f !== "uc")
        : filterName.includes("basic")
          ? filterName.filter((f) => f !== "basic")
          : filterName.includes("jquery")
            ? filterName.filter((f) => f !== "jquery")
            : filterName.includes("table")
              ? filterName.filter((f) => f !== "table")
              : filterName.includes("page")
                ? filterName.filter((f) => f !== "page")
                : filterName.includes("email")
                  ? filterName.filter((f) => f !== "email")
                  : filterName.includes("ecom")
                    ? filterName.filter((f) => f !== "ecom")
                    : filterName.includes("chart")
                      ? filterName.filter((f) => f !== "chart")
                      : filterName.includes("editor")
                        ? filterName.filter((f) => f !== "editor")
                        : filterName;

  function handleActiveWallet() {
    setHeadWallet(!headWallet)
  }
  const walletActive = window.matchMedia("(max-width:100rem)").matches
  useEffect(() => {
    if (walletActive) {
      setHeadWallet(true)
    } else {
      setHeadWallet(false)
    }
  }, [walletActive])

  return (
    <>
      <div className={`header ${path === "dashboard" || path === "index-2" ? 'home' : ''} ${headerFix ? 'is-fixed' : ''}`}>
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left">

              </div>
              <ul className="navbar-nav header-right ">

                <li className="nav-item dropdown notification_dropdown">
                  <Link to={"#"}
                    className={`nav-link bell dz-theme-mode ${background.value === "dark" ? "active" : ""}`}
                    onClick={() => handleThemeMode()}
                    hidden
                  >
                    {SVGICON.LightSvgIcon}
                    {SVGICON.DarkSvgIcon}
                  </Link>
                </li>
                <Dropdown as="li" className="nav-item header-profile2">
                  <Dropdown.Toggle to={"#"} className="nav-link i-false" as="div">
                    <div className="header-info2 d-flex align-items-center">
                      <div className="d-flex align-items-center sidebar-info">
                        <div>
                          <h5 className="mb-0 text-white">Hello!</h5>
                        </div>
                      </div>
                      <img src={profile} alt="profile" />
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end" className="mt-0 dropdown-menu dropdown-menu-right profile-dropdown">
                    {/* <div className="profile-info text-center mb-3 p-2">
                      <img src={profile} alt="profile" className="mb-2"/>
                      <h6 className="text-dark">John Doe</h6>
                      <p className="text-white mb-0">john.doe@example.com</p>
                    </div>
                    <Dropdown.Item as={Link} to="/profile" className="dropdown-item">
                      {SVGICON.EditSvgIcon}
                      <span className="ms-2">Edit Profile</span>
                    </Dropdown.Item> 
                    <Dropdown.Divider /> */}
                    <Logout />
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            </div>
          </nav>
        </div>
        {path === "dashboard" || path === "index-2" ?
          <div className="page-titles">
            <div className="sub-dz-head">
              <div className="d-flex align-items-center dz-head-title">
                <h2 className="text-white m-0">Dashboard</h2>
              </div>
            </div>
          </div>
          :
          <div className="page-titles">
            <div className="d-flex align-items-center">
              <h2 className="text-white"
                style={{ textTransform: "capitalize" }}
              >
                {finalName.join(" ").length === 0
                  ? "Dashboard"
                  : finalName.join(" ") === "dashboard dark"
                    ? "Dashboard"
                    : finalName.join(" ")}
              </h2>
            </div>
            <ol className="breadcrumb">
              <li className="breadcrumb-item active ms-auto">
                <Link to={"/"} className="d-flex align-self-center">
                  {SVGICON.HeaderHome}
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item"><Link to={"#"} style={{ textTransform: "capitalize" }}>{finalName.join(" ")}</Link></li>
            </ol>
          </div>
        }
      </div>

    </>
  );
};

export default Header;
