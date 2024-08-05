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
      if (response.data.token) {
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
        <div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
          <div className="d-flex justify-content-center h-100 align-items-center">
            <div className="authincation-content style-2">
              <div className="row no-gutters">
                <div className="col-xl-12 tab-content">
                  <div
                    id="sign-up"
                    className="auth-form tab-pane fade show active border-grey m-4 form-validation"
                  >

                    <form onSubmit={onLogin}>
                      <div className="text-center mb-lg-4 mb-2 logo">
                        <img src={IMAGES.LogoWhite} alt="" />
                      </div>
                      <div className="text-start mb-4">
                        <h3 className="text-start mb-2 text-white">Welcome to CWE Buster</h3>
                      </div>
                      {error && (
                        <div className='text-danger p-1 my-2'>
                          Invalid email or password, please try again.
                        </div>
                      )}
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label required text-white"
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
                        <label className="form-label required text-white">Password</label>
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
                      <button className="btn btn-block btn-bg text-white">
                        Sign In
                      </button>
                    </form>
                    <div className="new-account mt-3 text-center text-white">
                      <p className="font-w500">
                        Create an account?{" "}
                        <Link className="text-our-yellow" to="/register">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link to={"#"} className="text-our-yellow">
                      Terms
                    </Link>
                    <Link to={"#"} className="text-our-yellow mx-5">
                      Plans
                    </Link>
                    <Link to={"#"} className="text-our-yellow">
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
