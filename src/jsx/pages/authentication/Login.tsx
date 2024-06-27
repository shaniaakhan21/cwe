import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// image
// import logoFull from "../../../assets/images/logo-full.png";
import { IMAGES } from "../../constant/theme";
import axiosInstance from "../../../services/AxiosInstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  async function onLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/api/user/login", {
        email: email.toLowerCase().trim(),
        password
      });
      if(response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setError(true)
    }
  }

  return (
    <>
      <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
        <div className="login-aside text-center  d-flex flex-column flex-row-auto">
          <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
            <div className="text-center mb-lg-4 mb-2 pt-5 logo">
              <img src={IMAGES.LogoWhite} alt="" />
            </div>
            <h3 className="mb-2 text-white">Welcome back!</h3>
            <p className="mb-4">
              User Experience & Interface Design <br />
              Strategy SaaS Solutions
            </p>
          </div>
          <div
            className="aside-image position-relative"
            style={{ backgroundImage: `url(${IMAGES.BgPic2})` }}
          >
            <img className="img1 move-1" src={IMAGES.BgPic3} alt="" />
            <img className="img2 move-2" src={IMAGES.BgPic4} alt="" />
            <img className="img3 move-3" src={IMAGES.BgPic5} alt="" />
          </div>
        </div>
        <div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
          <div className="d-flex justify-content-center h-100 align-items-center">
            <div className="authincation-content style-2">
              <div className="row no-gutters">
                <div className="col-xl-12 tab-content">
                  <div
                    id="sign-up"
                    className="auth-form tab-pane fade show active  form-validation"
                  >
   
                    <form onSubmit={onLogin}>

                      <div className="text-center mb-4">
                        <h3 className="text-center mb-2 text-dark">Sign In</h3>
                      </div>
                      {error && (
												<div className='text-danger p-1 my-2'>
													Invalid email or password, please try again.
												</div>
											)}
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label required"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Type Your Email Address"
                        />
                      </div>
                      <div className="mb-3 position-relative">
                        <label className="form-label required">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          placeholder="Type Your Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="show-pass eye">
                          <i className="fa fa-eye-slash" />
                          <i className="fa fa-eye" />
                        </span>
                      </div>
                      <button className="btn btn-block btn-primary">
                        Sign In
                      </button>
                    </form>
                    <div className="new-account mt-3 text-center">
                      <p className="font-w500">
                        Create an account?{" "}
                        <Link className="text-primary" to="/register">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link to={"#"} className="text-primary">
                      Terms
                    </Link>
                    <Link to={"#"} className="text-primary mx-5">
                      Plans
                    </Link>
                    <Link to={"#"} className="text-primary">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
