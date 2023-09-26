import {
  DigiIconBars,
  DigiIconLanguageOutline,
  DigiIconSearch,
  DigiIconUserAlt,
  DigiLayoutContainer,
} from "@digi/arbetsformedlingen-react";
import "../styles/navBar.css";

const NavBar = () => {
  return (
    <div className="container">
      <DigiLayoutContainer>
        <div className="nav-wrap-flex">
          <div>
            <h2 className="title">Yrkesmatchningen</h2>
          </div>

          <nav className="nav-links">
            <div className="login">
              <span className="login-icon">
                <DigiIconUserAlt />
              </span>
              Logga in
            </div>
            <div className="lang">
              <span className="lang-icon">
                <DigiIconLanguageOutline />
              </span>
              Other Languages
            </div>
            <div className="search">
              <span className="search-icon">
                <DigiIconSearch />
              </span>
              Sök
            </div>
            <div className="menu">
              <span className="menu-icon">
                <DigiIconBars />
              </span>
              Meny
            </div>
          </nav>
        </div>
      </DigiLayoutContainer>
    </div>
  );
};

export default NavBar;
