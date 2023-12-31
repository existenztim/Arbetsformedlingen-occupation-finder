import { DigiLayoutContainer } from "@digi/arbetsformedlingen-react";
import { IMatch } from "../models/IMatch";
import "../styles/SearchResults.css";
import OneResult from "./OneResult";

interface SearchResultsProps {
  result: IMatch;
}

const SearchResults = ({ result }: SearchResultsProps) => {
  return (
    <DigiLayoutContainer>
      <div className="SR-container">
        <ul className="SR-matches">
          {result.related_occupations.map((occupation, index) => {
            if (!occupation.occupation_label) {
              return;
            }
            return <OneResult key={index} occupation={occupation} />;
          })}
        </ul>
      </div>
    </DigiLayoutContainer>
  );
};

export default SearchResults;
