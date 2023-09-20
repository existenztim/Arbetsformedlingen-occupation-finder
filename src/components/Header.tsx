import { DigiTypography } from "@digi/arbetsformedlingen-react";
import "../styles/header.css";
import { TypographyVariation } from "@digi/arbetsformedlingen";

const Header = () => {
  return (
    <DigiTypography afVariation={TypographyVariation.SMALL}>
      <header className="header">
        <h1 className="headline">Sök din framtida yrkesroll</h1>
      </header>
    </DigiTypography>
  );
};

export default Header;
