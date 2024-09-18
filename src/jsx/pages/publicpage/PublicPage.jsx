import Header from "./Header";
import Footer from "./Footer";
import CryptoList from "./TopCrypto";
import ReferralImg from '../../../assets/images/publicpages/ss-refer.png'
import RewardImg from '../../../assets/images/publicpages/rewards.png'
import CryptoCard from "./CryptoCard";
import CryptoTable from "./CryptoTable";
import "aos/dist/aos.css";


const PublicPage = () => {

    return (
        <div className='pagepub'>
            <Header showLinks={true} usePopup={true} bgColor='#000!important'/>
            <section className='bg-black'>
                <div className="bg-bitcoin" >
                    <div className="pdg" >
                        <div>
                            <h1>
                                Revolutionizing <br />  Cryptocurrency Trading
                            </h1>
                            <h5 className="line-it py-2">
                                Register for trading for Free
                            </h5>
                        </div>
                    </div>
                </div>
            </section>

            <section  className='bg-black'>
                <div className="bg-bitcoin-2">
                    <div className="pdgn-2">
                        <div>
                            <h1>
                                A New Era of Crypto Trading Services
                            </h1>
                        </div>
                        <div className="w-100 justify-content-end d-flex-end">
                            <div className="w-65 py-5 padding-phn">
                                <p>
                                    At CWE Buster, we&apos;re not just about trading;
                                    we&apos;re about creating seamless and profitable experiences.
                                    Our subscription model is designed to give you continuous access to advanced trading tools and analytics.
                                    From beginners to professional traders, we cater to all your trading needs with unparalleled ease and efficiency.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section  className='bg-black'>
                <div className="bg-bitcoin-3 pb-4" id="buy-crypto-section">
                    <div className="pdgn-3">
                        <div>
                            <h1>
                                <b>Buy & Sell Cryptos</b>
                            </h1>
                        </div>
                        <div className="w-100 justify-content-center d-flex-center">
                            <div className="w-50 w-phn py-3">
                                <p>
                                    Subscribe and unlock a world of trading possibilities. Request as many trade setups as you need,
                                    and receive them within just a few business days. Our commitment to your satisfaction means we offer unlimited revisions until you&apos;re completely happy with the outcome.
                                </p>
                            </div>
                        </div>
                        <div className="w-100 d-flex cryptosFlex  justify-content-center">
                            <div className="w-50 mx-5  d-flex justify-content-center listC">
                                <div className="w-65 listC2"  data-aos="fade-right" data-aos-duration="2000">
                                    <CryptoList />
                                </div>
                            </div>
                            {/* <div className="w-50 mx-5  d-flex justify-content-start listC justify-content-c">
                                <div className="w-65 listC2"  data-aos="fade-left" data-aos-duration="2000">
                                    <BuySell />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-5 bg-black" id="earn-section"  >
                <div className="bg-bitcoin-3 SS">
                    <div className="pdgn-3">
                        <div>
                            <h1>
                                <b>Earn Rewards</b>
                            </h1>
                        </div>
                        <div className="w-100 justify-content-center d-flex-center">
                            <div className="w-35 py-3 w-phn">
                                <p>
                                    Simple & Secure. Refer your friends using  referral link and earn as soon as they start trading.
                                </p>
                            </div>
                        </div>
                        <div className="w-100 justify-content-center d-flex row-flex cryptosFlex" >
                            <div className="w-25 d-flex justify-content-start firstSS listC2" data-aos="fade-right" >
                                <img
                                    src={ReferralImg}
                                    className="w-100"
                                    alt=""
                                />
                            </div>
                            <div className="w-25 d-flex col-flex justify-content-start align-items-center borderWhite py-5 px-2 listC2" data-aos="fade-left" >
                                <h3>
                                    <b>Copy </b>and <b>Share</b>  referral link with your friends and
                                    <span style={{ color: '#FCD535' }}><b> earn points </b></span>
                                    on every trade they make.
                                </h3>
                                <img
                                    src={RewardImg}
                                    className="w-75"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-5 pb-5 bg-black" id="markets-section" >
                <div className="bg-bitcoin-3 SS">
                    <div className="pdgn-3">
                        <div>
                            <h1>
                                <b>Crypto Prices</b>
                            </h1>
                        </div>
                        <div className="w-100 justify-content-center d-flex-center">
                            <div className="w-35 pt-3 pb-2 w-phn">
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
            <Footer />
        </div>

    )
}
export default PublicPage;