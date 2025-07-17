import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";

const devs = [
  { name: "Lakshitaa Parashar", link: "https://www.linkedin.com/in/lakshitaa-parashar-030b86313/" },
  { name: "Khushi Mittal", link: "https://www.linkedin.com/in/khushi-mittal-467b26341/" },
  { name: "Garv Batra", link: "https://www.linkedin.com/in/garv-batra-0655352b2/" },
  { name: "Harsimran Singh", link: "https://www.linkedin.com/in/harsimran-singh-6b9aaa303" },
  { name: "Aakshi Saxena", link: "https://www.linkedin.com/in/aakshi-saxena-a7a984374" },
  { name: "Akshita Garg", link: "https://www.linkedin.com/in/akshita-garg-9b393a32a/" },
  { name: "Sreansh Verma", link: "https://www.linkedin.com/in/sreansh-verma-0b9647339/" },
  { name: "Kashish Mehra", link: "https://www.linkedin.com/in/kashish-mehra-480550364/" },
  { name: "Payal Tyagi", link: "https://www.linkedin.com/in/payal-tyagi-ab18a8314/" },
];

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [activeDev, setActiveDev] = useState(null);
  const scrollBtnRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTop = () => {
    if (scrollBtnRef.current) {
      scrollBtnRef.current.classList.add("fly");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        if (scrollBtnRef.current) {
          scrollBtnRef.current.classList.remove("fly");
        }
      }, 800);
    }
  };

 return (
  <div className="foot">
    <div className="container">
      {/* Top Section */}
      <div className="top aligned-footer">
        {/* IEEE Logo */}
        <div className="one same">
          <img className="logo" src="/logo.png" alt="Logo" />
        </div>

        {/* Contact Us - Centered */}
        <div className="three same center-contact">
          <h3>
            Contact Us
            <div className="underline"><span></span></div>
          </h3>
          <div className="contact-entry">
            <span className="contact-name">Manayav Vatsal</span>
            <span className="phone">
              <i className="fa-solid fa-phone"></i> +91-7905071036
            </span>
          </div>
          <div className="contact-entry">
            <span className="contact-name">Anoushka Kaushik</span>
            <span className="phone">
              <i className="fa-solid fa-phone"></i> +91-9953193922
            </span>
          </div>
          <div className="email-entry">
            <span className="email">
              <i className="fa-solid fa-envelope"></i> ieeesbjiitdb@gmail.com
            </span>
          </div>
        </div>

        {/* Connect With Us - Right */}
        <div className="connect same">
          <h3>
            Connect With Us
            <div className="underline"><span></span></div>
          </h3>
          <ul className="social-icons">
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/ieeesbjiit/?igsh=bnk1amRxeGdxNGts#"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/ieeesbjiit/"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/ieeesbjiit"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/company/ieee-student-branch-jiit/?originalSubdomain=in"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href=": https://whatsapp.com/channel/0029VajH49o42DcniGpYxj3j"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      {/* Developer Marquee */}
      <div className="footer-dev-section">
  <div className="dev-label">Developed By:-</div>
  <div className="dev-line">
    {devs.map((dev) => (
      <a
        key={dev.name}
        className="dev-name"
        href={dev.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {dev.name}
      </a>
    ))}
  </div>
</div>


      {/* Scroll to Top Button */}
      <button
        id="scrollTopBtn"
        title="Go to top"
        ref={scrollBtnRef}
        style={{ display: showScroll ? "block" : "none" }}
        onClick={handleScrollTop}
      >
        <img id="robo" src="/back2.png" alt="Go to top" />
      </button>
    </div>
  </div>
);

};

export default Footer;