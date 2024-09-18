const Footer = () => {
  var d = new Date();
  return (
    <div className="footer">
      <div className="copyright">
        <p>
          Copyright © CWE Booster
          {d.getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
