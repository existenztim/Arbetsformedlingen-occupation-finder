import { useContext } from "react";
import { FilterContext } from "./FilterContainer";
import { DigiNavigationPagination } from "@digi/arbetsformedlingen-react";
import "../styles/paginationBar.css";

const PaginationBar = () => {
  const {
    totalPages,
    pagination,
    responseData,
    handlePaginationChange,
  } = useContext(FilterContext)

  return (
    <div className={totalPages > 1 ? "pagination-container" : "pagination-container-hide"}>
      <DigiNavigationPagination
        afTotalPages={totalPages}
        afInitActivePage={pagination.currentPage}
        afCurrentResultStart={pagination.currentStartValue}
        afCurrentResultEnd={pagination.currentEndValue}
        afTotalResults={responseData?.hits_returned || 0}
        afResultName="resultat"
        onAfOnPageChange={handlePaginationChange}
      ></DigiNavigationPagination>
    </div>
  );
};

export default PaginationBar;
