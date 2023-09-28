import { DigiLayoutContainer } from "@digi/arbetsformedlingen-react";
import "../styles/navBar.css";

const NavBar = () => {
  return (
    <div className="nav-container">
      <DigiLayoutContainer>
        <div className="nav-wrap-flex">
          <div className="nav-text-wrap">
            <h2 className="title">
              <img className="logo" src="src/assets/logo.svg" alt="" />
              YRKESMATCHNINGEN
            </h2>
            <p className="under-title">TRIFORCE COLLABORATION</p>
          </div>

          <nav>
            <ul className="nav-links">
              <li className="login"></li>
              <li className="lang"></li>
              <li className="search"></li>
              <li className="menu"></li>
            </ul>
          </nav>
        </div>
      </DigiLayoutContainer>
    </div>
  );
};

export default NavBar;
