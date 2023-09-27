import {
  DigiLayoutContainer,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";
import "../styles/header.css";
import { TypographyVariation } from "@digi/arbetsformedlingen";

const Header = () => {
  return (
    <header className="header">
      <DigiLayoutContainer>
        <DigiTypography afVariation={TypographyVariation.SMALL}>
          <h1 className="header-text">Sök din framtida Yrkesroll</h1>
        </DigiTypography>
      </DigiLayoutContainer>
    </header>
  );
};

export default Header;
