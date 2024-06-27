import { lazy, Suspense, useEffect, useState } from 'react';
/// Components
import Index from './jsx/router/index';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
/// Style

import 'rsuite/dist/rsuite-no-reset.min.css';
import "./assets/css/style.css";

const SignUp = lazy(() => import('./jsx/pages/authentication/Registration'));
const Login = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('./jsx/pages/authentication/Login')), 500);
    });
});

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

function App() {

    const navigate = useNavigate()
    // we redirect to dashboard if user is already logged in
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if(!isAuth) {
            const token = localStorage.getItem('token');
            if (token) {
                setIsAuth(true);
            }
        }else{
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuth(false);
            }
        }

    }, [navigate]);

    let routeblog = (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register/:referralId' element={<SignUp />} />
            <Route path='/register' element={<SignUp />} />
        </Routes>
    );
    if (isAuth) {
        return (
            <>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                }
                >
                    <Index />
                </Suspense>
            </>
        );

    } else {
        return (
            <div className="vh-100">
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                }
                >
                    {routeblog}
                </Suspense>
            </div>
        );
    }
};

export default withRouter(App); 