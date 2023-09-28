import {
  DigiLayoutContainer,
  DigiTypographyMeta,
} from "@digi/arbetsformedlingen-react";
import "../styles/header.css";
import { TypographyMetaVariation } from "@digi/arbetsformedlingen";

const Header = () => {
  return (
    <div className="header-container">
      <DigiLayoutContainer>
        <header className="header">
          <DigiTypographyMeta afVariation={TypographyMetaVariation.PRIMARY}>
            <h1 className="header-title">Sök din framtida Yrkesroll</h1>
            <h2 className="header-quote" slot="secondary">
              Vi matchar yrkesroller baserat på utbildning.
            </h2>
          </DigiTypographyMeta>
        </header>
      </DigiLayoutContainer>
    </div>
  );
};

export default Header;
