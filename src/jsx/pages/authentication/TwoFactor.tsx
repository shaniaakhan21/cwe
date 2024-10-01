import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../../constant/theme";
import Header from "../publicpage/Header";

function TwoFactor() {
    const [code, setCode] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate()

    async function onVerifyCode(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Simulating a correct code value (e.g., 123456)
        const mockCode = "123456";

        // Simulating delay as if verifying via an API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate a successful verification if the code matches the mock value
        if (code === mockCode) {
            // Navigate to the dashboard after successful 2FA verification
            navigate("/dashboard", { replace: true });
        } else {
            // Set error if the code is incorrect
            setError(true);
        }
    }


    return (
        <>
            <Header showLinks={false} usePopup={false} bgColor='#181A20' />
            <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
                <div className="container flex-row-fluid d-flex flex-column justify-content-start position-relative overflow-hidden p-7 mx-auto">
                    <div className="d-flex justify-content-center h-100 align-items-center">
                        <div className="authincation-content style-2">
                            <div className="row no-gutters">
                                <div className="col-xl-12 tab-content">
                                    <div
                                        id="sign-up"
                                        className="auth-form tab-pane fade show active border-yellow-01 m-4 form-validation"
                                    >

                                        <form onSubmit={onVerifyCode}>
                                            <div className="text-center mb-lg-4 mb-2 logo flex j">
                                                <Link to="https://www.cwebooster.com/" className="logo">
                                                    <img src={IMAGES.LogoWhite} alt="" />
                                                </Link>
                                            </div>
                                            <div className="text-start mb-4">
                                                <h3 className="text-center mb-2 text-greyish">Two Factor Authentication</h3>
                                                <h6 className="text-center">Check your inbox and enter 6-digit verification code below to verify.</h6>
                                            </div>
                                            {error && (
                                                <div className='text-danger p-1 my-2'>
                                                    Invalid email or password, please try again.
                                                </div>
                                            )}
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleFormControlInput1"
                                                    className="form-label required text-greyish"
                                                >
                                                    Enter Verification Code
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={code}
                                                    onChange={(e) => setCode(e.target.value)}
                                                    placeholder="Type Code Here"
                                                />
                                            </div>
                                            <button className="btn btn-block btn-bg text-black">
                                                Verfiy
                                            </button>
                                        </form>
                                        <div className="new-account mt-3 text-center text-greyish">
                                            <p className="font-w500">
                                                Create an account?{" "}
                                                <Link className="text-our-yellow" to="/register">
                                                    Sign Up
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="new-account mt-1">
                                            <p className="text-greyish text-center">
                                                Already have an account?{" "}
                                                <Link className="text-our-yellow" to="/login">
                                                    Login
                                                </Link>
                                            </p>
                                        </div>
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

export default TwoFactor;
