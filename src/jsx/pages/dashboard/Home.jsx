import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';

//Import 
import { SVGICON } from '../../constant/theme';
import MainSlider from '../../elements/dashboard/MainSlider';
import StatisticsBlog from '../../elements/dashboard/StatisticsBlog';
import MarketOverViewBlog from '../../elements/dashboard/MarketOverViewBlog';
import RecentTransaction from '../../elements/dashboard/RecentTransaction';
import { ThemeContext } from '../../../context/ThemeContext';
import axiosInstance from '../../../services/AxiosInstance';
import { toast } from 'react-toastify';
import { Snackbar, Alert } from '@mui/material';
import Marketing from './Marketing';

//Charts
// const SurveyChart = loadable(() =>
//  	pMinDelay(import("../../elements/dashboard/SurveyChart"), 500)
// );

export function MainComponent() {
	const [me, setMe] = useState(null)
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [copied, setCopied] = useState(false);

	const fetchMe = async () => {

		try {
			const token = localStorage.getItem('token')
			if (token) {
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

	let referralLink = ''
	if (me) {
		referralLink = `https://app.cwebooster.com/register/${me.id}`
	}

	const copyReferralLink = (referralLink) => {
		navigator.clipboard.writeText(referralLink);
		setCopied(true);
		setTimeout(() => setCopied(false), 3000);
		setOpenSnackbar(true);
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	return (
		<Row>
			<Col xl={12}>
				<div className="row">
					<MainSlider />
				</div>

				<Row>
					<div className=" col-12">
						<div className='card border-yellow-02'>
							<Card.Body className="d-flex reflink align-items-center justify-content-between mb-0">
								<h4 className=''>Referral Link</h4>
								<Card.Text>
									{referralLink}
								</Card.Text>
								<Button
									onClick={() => copyReferralLink(referralLink)}
									variant=" "
									className="btn-card btn-success btn-m"
								>
									<i className="fa fa-copy" /> {copied ? 'Copied!' : 'Copy'}
								</Button>
							</Card.Body>
						</div>

					</div>
				</Row>
				<Snackbar
					open={openSnackbar}
					autoHideDuration={2000}
					onClose={handleCloseSnackbar}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					className='snackbar-it'
				>
					<Alert onClose={handleCloseSnackbar} sx={{
						backgroundColor: '#FCD535;',
						width: '100%',
						color: '#fff',
					}}>
						Referral Link Copied to Clipboard
					</Alert>
				</Snackbar>
				<Row>
					<Marketing referralLink={referralLink} />
				</Row>
			</Col>
		</Row>
	)
}

const Home = () => {
	// const { changeBackground } = useContext(ThemeContext);
	// useEffect(() => {
	// 	changeBackground({ value: "dark", label: "Dark" });
	// }, []);	


	const locact = useLocation()

	const { changeBackground,
		changeNavigationHader,
		chnageHaderColor,
		changePrimaryColor,
		changeSideBarStyle,
		changeSideBarLayout,
		chnageSidebarColor
	} = useContext(ThemeContext);
	useEffect(() => {

		switch (locact.search) {
			case "?theme=1":
				changeBackground({ value: "dark", label: "Dark" });
				changeNavigationHader('color_3')
				chnageHaderColor('color_3')
				changePrimaryColor('color_1')
				break;
			case "?theme=2":
				changeBackground({ value: "dark", label: "Dark" });
				changeSideBarStyle({ value: "mini", label: "Mini" });
				changeNavigationHader('color_13')
				chnageHaderColor('color_13')
				changePrimaryColor('color_13')
				break;
			case "?theme=4":
				changeBackground({ value: "dark", label: "Dark" });
				changeSideBarLayout({ value: "horizontal", label: "Horizontal" });
				changeSideBarStyle({ value: "full", label: "Full" });
				changeNavigationHader('color_1')
				chnageHaderColor('color_1')
				chnageSidebarColor('color_7')
				changePrimaryColor('color_7')
				break;

			case "?theme=5":
				changeBackground({ value: "dark", label: "Dark" });
				changeSideBarLayout({ value: "horizontal", label: "Horizontal" });
				changeSideBarStyle({ value: "full", label: "Full" });
				changeNavigationHader('color_3')
				chnageHaderColor('color_3')
				chnageSidebarColor('color_1')
				changePrimaryColor('color_1')
				break;
			case "?theme=6":
				changeBackground({ value: "dark", label: "Dark" });
				changeNavigationHader('color_10')
				chnageHaderColor('color_13')
				chnageSidebarColor('color_10')
				changePrimaryColor('color_13')
				break;
			default:
				changeBackground({ value: "dark", label: "Dark" });
				changeNavigationHader('color_3')
				chnageHaderColor('color_3')
				changePrimaryColor('color_1')
				break;
		}

	}, [locact.pathname]);
	return (
		<>
			<MainComponent />
		</>
	)
}

export default Home;