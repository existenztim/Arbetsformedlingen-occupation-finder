import {
  DigiLayoutColumns,
  DigiLayoutContainer,
} from "@digi/arbetsformedlingen-react";
import "../styles/footer.css";
import { LayoutColumnsVariation } from "@digi/arbetsformedlingen";

const Footer = () => {
  return (
    <section className="footer-wrapper">
      <DigiLayoutContainer>
        <DigiLayoutColumns afVariation={LayoutColumnsVariation.TWO}>
          <h4>YRKESMATCHNINGEN</h4>
          <footer className="footer-links">
            <span>
              <strong>Följ oss på</strong>
            </span>
            <a href="">Facebook</a>
            <a href="">Linkedin</a>
            <a href="">Youtube</a>
            <a href="">Instagram</a>
          </footer>
        </DigiLayoutColumns>
      </DigiLayoutContainer>
    </section>
  );
};

export default Footer;
