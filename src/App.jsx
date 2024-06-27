import { lazy, Suspense, useEffect, useState } from 'react';
/// Components
import Index from './jsx/router/index';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

/// Style

import 'rsuite/dist/rsuite-no-reset.min.css';
import "./assets/css/style.css";



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
};

export default withRouter(App); 