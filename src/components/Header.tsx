import {
  DigiLayoutContainer,
  DigiTypographyPreamble,
} from "@digi/arbetsformedlingen-react";
import "../styles/header.css";

const Header = () => {
  return (
    <div className="header-container">
      <DigiLayoutContainer>
        <header className="header">
          <div>
            <h2 className="header-title">SÖK DIN FRAMTIDA YRKESROLL</h2>
          </div>
          <div>
            <DigiTypographyPreamble>
              <div className="text-flex">
                <div>
                  <p className="blockquote">''</p>
                </div>
                <div>
                  <h2 className="header-quote">
                    Se utbildningens matchande yrkesroller <br />
                    och de mest efterfrågade kompetenserna.
                  </h2>
                </div>
              </div>
            </DigiTypographyPreamble>
          </div>
        </header>
      </DigiLayoutContainer>
    </div>
  );
};

export default Header;
