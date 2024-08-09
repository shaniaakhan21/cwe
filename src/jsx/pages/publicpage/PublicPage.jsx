import Header from "./Header";
import Footer from "./Footer";
import Button from '@mui/material/Button';

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
            <Footer />
        </>

    )
}
export default PublicPage;