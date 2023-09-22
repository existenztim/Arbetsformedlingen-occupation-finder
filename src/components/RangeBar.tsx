import { useContext } from "react";
import { FilterContext } from "./FilterContainer";
import "../styles/rangeBar.css";

const RangeBar = () => {
  const {
    responseData,
    rangeValue,
    handleRangeChange,
  } = useContext(FilterContext);

  return (
    <div className="range-container">
      <p>
        Just nu hämtas: {responseData?.hits_returned}/{responseData?.hits_total} resultat
      </p>
      <div className="range-bar">
        <label htmlFor="rangeInput" className="range-value">
          {rangeValue}
        </label>
        <input
          id="rangeInput"
          type="range"
          min="1"
          max={responseData?.hits_total}
          defaultValue={responseData?.hits_returned}
          onChange={handleRangeChange}
        />
      </div>
    </div>
  );
};

export default RangeBar;
