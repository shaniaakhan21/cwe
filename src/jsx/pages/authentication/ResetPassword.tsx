import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../../constant/theme";
import Header from "../publicpage/Header";
import axiosInstance from "../../../services/AxiosInstance";

function Reset() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<boolean>(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await axiosInstance.post("/api/user/reset-password", {
                email: email.toLowerCase().trim(),
              });
            setSuccess(true);
            setEmail('');
        } catch (err) {
            setError("Failed to request password reset. Please try again.");
            console.error(err);
        } finally {
            setLoading(false); // Reset loading state
        }
    }

    return (
        <>
            <Header showLinks={false} usePopup={false} bgColor="#181A20" />
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
                                        <form onSubmit={onSubmit}>
                                            <div className="text-center mb-lg-4 mb-2 logo flex j">
                                                <Link to="https://www.cwebooster.com/" className="logo">
                                                    <img src={IMAGES.LogoWhite} alt="Logo" />
                                                </Link>
                                            </div>
                                            <div className="text-start mb-2">
                                                <h3 className="text-center mb-2 text-greyish">
                                                    Forgot your password?
                                                </h3>
                                            </div>
                                            <div>
                                                <h6 className="text-center mb-4 p-0 passtext">
                                                    Please provide the email address where you'd like to
                                                    receive your password reset instructions.
                                                </h6>
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="emailInput"
                                                    className="form-label required text-greyish"
                                                >
                                                    Email address
                                                </label>
                                                <input
                                                    type="email"
                                                    id="emailInput"
                                                    className="form-control"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Type Your Email Address"
                                                    required
                                                />
                                            </div>
                                            {error && (
                                                <div className="alert alert-danger passtext">{error}</div>
                                            )}
                                            {success && (
                                                <div className="alert alert-success passtext">
                                                    Please check your email for the reset link.
                                                </div>
                                            )}
                                            <button
                                                type="submit"
                                                className="btn btn-block btn-bg text-black"
                                                disabled={loading}
                                            >
                                                {loading ? "Processing..." : "Request Password Reset"}
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
                                        <div className="new-account mt-1 text-center text-greyish">
                                            <p className="font-w500">
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

export default Reset;
