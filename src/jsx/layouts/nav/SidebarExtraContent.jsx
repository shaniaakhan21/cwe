import React from 'react';
import { SVGICON } from '../../constant/theme';
import { useLocation } from 'react-router-dom';

// let path = window.location.pathname;
// path = path.split("/");
// path = path[path.length - 1];

const SidebarExtraContent = () => {	
	const location = useLocation();
	const { pathname } = location;
	const compare = ['/dashboard-2', '/index-2'];

    return (
        <>            
			<div className={`feature-box ${compare.includes(pathname) ? '' : 'style-3' }`}>

				{compare.includes(pathname) ?  
					<div className="d-flex justify-content-center align-items-center">
						<div className="item-1">
							{SVGICON.UserFollower}
							<h4 className="mb-0 text-greyish"><span className="counter">2023</span>k</h4>
							<small>Followers</small>
						</div>
						<div className="item-1">
							{SVGICON.UserFollowing}
							<h4 className="mb-0 text-greyish"><span className="counter">2024</span>k</h4>
							<small>Following</small>
						</div>
					</div>	
					:
					''
				}				
			</div>
        </>
    );
};

export default SidebarExtraContent;