import { useContext } from "react";
import { FilterContext } from "./FilterContainer";

const RangeBar = () => {
  const filterContext = useContext(FilterContext);
  return (
    <div className="range-container">
      <p>
        Just nu hämtas: {filterContext.responseData?.hits_returned}/
        {filterContext.responseData?.hits_total}
        resultat
      </p>
      <div className="range-bar">
        <label htmlFor="rangeInput" className="range-value">
          {filterContext.rangeValue >
          (filterContext.responseData?.hits_returned ?? 0)
            ? filterContext.responseData?.hits_returned ?? 0
            : filterContext.rangeValue}
        </label>
        <input
          id="rangeInput"
          type="range"
          min="1"
          max={filterContext.responseData?.hits_total}
          defaultValue={filterContext.responseData?.hits_returned}
          onMouseUp={filterContext.handleMouseUp}
          onChange={filterContext.handleRangeChange}
        />
      </div>
    </div>
  );
};

export default RangeBar;
