import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IMAGES } from "../../constant/theme";
import Header from "../publicpage/Header";
import axiosInstance from "../../../services/AxiosInstance";

// Simulate setting new password
const simulateSetNewPassword = async (password: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (password.length >= 8) {
                resolve({ message: "Password successfully updated" });
            } else {
                reject(new Error("Password must be at least 8 characters long"));
            }
        }, 2000);
    });
};

function ChangePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<boolean>(false);
    const { token } = useParams();

    const [checked, setChecked] = useState<boolean|undefined>(undefined);

    const checkToken = async () => {
        try {
            await axiosInstance.post("/api/user/check-token", {
                token: token,
              });
              return setChecked(true);
        } catch (err) {

        }
        return setChecked(false);
    }

    useEffect(() => {

          checkToken();
        
    }, []);

    const updatePassword = async () => {
        try {
            await axiosInstance.post("/api/user/update-password", {
                token: token,
                password: password,
              });
        } catch (err) {

        }
    }


    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            await updatePassword();
            setSuccess(true);
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError((err as Error).message);
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
                                        {checked && (
                                            <>
                                                <form onSubmit={onSubmit}>
                                                    <div className="text-center mb-lg-4 mb-2 logo flex j">
                                                        <Link to="https://www.cwebooster.com/" className="logo">
                                                            <img src={IMAGES.LogoWhite} alt="Logo" />
                                                        </Link>
                                                    </div>
                                                    <div className="text-start mb-2">
                                                        <h3 className="text-center mb-2 text-greyish">
                                                            Set Your New Password
                                                        </h3>
                                                    </div>
                                                    <div>
                                                        <h6 className="text-center mb-4 p-0 passtext">
                                                            Please enter your new password below and confirm it to secure your account.
                                                        </h6>
                                                    </div>
                                                    <div className="mb-3 position-relative">
                                                        <label className="form-label required text-greyish">
                                                            New Password
                                                        </label>
                                                        <input
                                                            type={showPassword ? "text" : "password"}
                                                            className="form-control"
                                                            value={password}
                                                            placeholder="Enter New Password"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                        />
                                                        <span
                                                            className={`show-pass ${showPassword ? 'active' : ''}`}
                                                            onClick={() => setShowPassword(prev => !prev)}
                                                            style={{ cursor: 'pointer', position: 'absolute', right: 10, top: 35 }}
                                                        >
                                                            <i className={`fa fa-eye ${showPassword ? 'active' : ''}`} />
                                                            <i className={`fa fa-eye-slash ${showPassword ? '' : 'active'}`} />
                                                        </span>
                                                    </div>
                                                    <div className="mb-3 position-relative">
                                                        <label className="form-label required text-greyish">
                                                            Confirm Password
                                                        </label>
                                                        <input
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            className="form-control"
                                                            value={confirmPassword}
                                                            placeholder="Confirm New Password"
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            required
                                                        />
                                                        <span
                                                            className={`show-pass ${showConfirmPassword ? 'active' : ''}`}
                                                            onClick={() => setShowConfirmPassword(prev => !prev)}
                                                            style={{ cursor: 'pointer', position: 'absolute', right: 10, top: 35 }}
                                                        >
                                                            <i className={`fa fa-eye ${showConfirmPassword ? 'active' : ''}`} />
                                                            <i className={`fa fa-eye-slash ${showConfirmPassword ? '' : 'active'}`} />
                                                        </span>
                                                    </div>
                                                    {error && (
                                                        <div className="alert alert-danger passtext">{error}</div>
                                                    )}
                                                    {success && (
                                                        <div className="alert alert-success passtext">
                                                            Your password has been successfully updated.
                                                        </div>
                                                    )}
                                                    <button
                                                        type="submit"
                                                        className="btn btn-block btn-bg text-black"
                                                        disabled={loading}
                                                    >
                                                        {loading ? "Processing..." : "Set New Password"}
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
                                            </>)}
                                        {checked === undefined && (
                                            <>
                                                <div style={{ textAlign: "center" }}>
                                                    <div className="spinner-border" style={{ width: "8rem", height: "8rem" }} role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {checked === false && (
                                            <>
                                                <h4>The link you have visited is either expired or broken</h4>
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
                                            </>
                                        )}
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

export default ChangePassword;
