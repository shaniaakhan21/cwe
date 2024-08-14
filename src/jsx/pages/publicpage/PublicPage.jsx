import Header from "./Header";
import Footer from "./Footer";
import Button from '@mui/material/Button';
import CryptoList from "./TopCrypto";
import BuySell from "./BuySell";
import ReferralImg from '../../../assets/images/publicpages/ss-refer.jpg'
import RewardImg from '../../../assets/images/publicpages/rewards.png'
import CryptoCard from "./CryptoCard";
import CryptoTable from "./CryptoTable";
import FAQAccordion from "./FAQAccordion";

const PublicPage = () => {


    return (
        <>
            <Header />
            <section>
                <div className="bg-bitcoin">
                    <div className="pdg">
                        <div>
                            <h1>
                                <b>Revolutionizing</b> <br />  Cryptocurrency Trading
                            </h1>
                            <h5 className="line-it py-2">
                                One Subscription at a Time
                            </h5>
                        </div>
                        <div className="py-3">
                            <Button variant="contained" className='btn-yellow-cwe padding-cstm-2'><b>Get Started</b></Button>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="bg-bitcoin-2">
                    <div className="pdgn-2">
                        <div>
                            <h1>
                                A New Era of <b>Crypto</b> Trading Services
                            </h1>
                        </div>
                        <div className="w-100 justify-content-end d-flex-end">
                            <div className="w-65 py-5">
                                <p>
                                    At CWE Buster, we&apos;re not just about trading;
                                    we&apos;re about creating seamless and profitable experiences.
                                    Our subscription model is designed to give you continuous access to advanced trading tools and analytics.
                                    From beginners to professional traders, we cater to all your trading needs with unparalleled ease and efficiency.
                                </p>
                            </div>
                            <div className="py-3 w-50 btn-end">
                                <Button variant="contained" className='btn-yellow-cwe padding-cstm-2'><b>Trade Now!</b></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="bg-bitcoin-3 mb-4">
                    <div className="pdgn-3">
                        <div>
                            <h1>
                                <b>Buy & Sell Cryptos</b>
                            </h1>
                        </div>
                        <div className="w-100 justify-content-center d-flex-center">
                            <div className="w-50 py-3">
                                <p>
                                    Subscribe and unlock a world of trading possibilities. Request as many trade setups as you need,
                                    and receive them within just a few business days. Our commitment to your satisfaction means we offer unlimited revisions until you&apos;re completely happy with the outcome.
                                </p>
                            </div>
                        </div>
                        <div className="w-100 d-flex">
                            <div className="w-50 mx-5  d-flex justify-content-center">
                                <div className="w-65">
                                    <CryptoList />
                                </div>
                            </div>
                            <div className="w-50 mx-5  d-flex justify-content-start">
                                <div className="w-65">
                                    <BuySell />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-5">
                <div className="bg-bitcoin-3 SS">
                    <div className="pdgn-3">
                        <div>
                            <h1>
                                <b>Earn Rewards</b>
                            </h1>
                        </div>
                        <div className="w-100 justify-content-center d-flex-center">
                            <div className="w-35 py-3">
                                <p>
                                    Simple & Secure. Refer your friends using  referral link and earn as soon as they start trading.
                                </p>
                            </div>
                        </div>
                        <div className="w-100 justify-content-center d-flex row-flex ">
                            <div className="w-25 d-flex justify-content-start firstSS">
                                <img
                                    src={ReferralImg}
                                    className="w-100"
                                    alt=""
                                />
                            </div>
                            <div className="w-25 d-flex col-flex justify-content-between align-items-center borderWhite py-5 px-2">
                                <h3>
                                    <b>Copy </b>and <b>Share</b>  referral link with your friends and
                                    <span style={{ color: '#cea62d' }}><b> earn points </b></span>
                                    on every trade they make.
                                </h3>
                                <img
                                    src={RewardImg}
                                    className="w-75"
                                    alt=""
                                />
                                <div className='w-100 px-4'>
                                    <Button variant="contained" className='btn-yellow-cwe padding-cstm-2 w-100'>
                                        Get Started Now!
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-5 mb-5">
                <div className="bg-bitcoin-3 SS">
                    <div className="pdgn-3">
                        <div>
                            <h1>
                                <b>Crypto Prices</b>
                            </h1>
                        </div>
                        <div className="w-100 justify-content-center d-flex-center">
                            <div className="w-35 pt-3 pb-2">
                                <p>
                                    Watch the Latest Crypto trends and stay updated on top movers and do some smart trading over here.
                                </p>
                            </div>
                        </div>
                        <div className="w-100 justify-content-center d-flex-center">
                            <h2>
                                Top Movers
                            </h2>
                        </div>
                    </div>
                    <div>
                        <CryptoCard />
                    </div>
                    <div className="w-100 justify-content-center d-flex-center py-4">
                        <h2>
                            Today&apos;s Cryptocurrency Prices
                        </h2>
                    </div>
                    <div>
                        <CryptoTable />
                    </div>
                </div>
            </section>

            {/* <section className="mt-5 mb-5">
                <div className="bg-bitcoin-3 SS">
                    <div className="pdgn-3">
                        <div>
                            <h1>
                                <b>Frequently Asked Questions</b>
                            </h1>
                        </div>
                    </div>
                    <div>
                        <FAQAccordion />
                    </div>
                </div>
            </section> */}

            <section className="mt-5 Start2Day">
                <div className="bg-bitcoin-3 SS">
                    <div className="pdgn-3">
                        <div>
                            <h1>
                                Start earning today
                            </h1>
                        </div>
                        <div className="align-btn">
                            <Button variant="contained" className='btn-black padding-cstm-2 w-25'>
                                Sign Up Now!!
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>

    )
}
export default PublicPage;