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
                                <b>Revolutionizing</b> <br/>  Cryptocurrency Trading
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
            <Footer />
        </>

    )
}
export default PublicPage;