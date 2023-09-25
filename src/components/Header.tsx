import { DigiTypography } from "@digi/arbetsformedlingen-react";
import "../styles/header.css";
import { TypographyVariation } from "@digi/arbetsformedlingen";

const Header = () => {
  return (
    <DigiTypography afVariation={TypographyVariation.LARGE}>
      <header className="header">
        <div className="headline-container">
          <div className="header-text">
            <h1 className="headline">Sök din framtida yrkesroll</h1>
            <div>
              <p className="header-p">
                "Hitta matchande yrkesroller och kompetenser utifrån
                utbildning."
              </p>
            </div>
          </div>
        </div>
      </header>
    </DigiTypography>
  );
};

export default Header;
