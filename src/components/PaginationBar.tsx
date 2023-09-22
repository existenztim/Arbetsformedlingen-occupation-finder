import { useContext } from "react";
import { FilterContext } from "./FilterContainer";
import { DigiNavigationPagination } from "@digi/arbetsformedlingen-react";
import "../styles/paginationBar.css";

const PaginationBar = () => {
  const filterContext = useContext(FilterContext);
  return (
    <div className={filterContext.totalPages > 1 ? "pagination-container" : "pagination-container-hide"}>
      <DigiNavigationPagination
        afTotalPages={filterContext.totalPages}
        afInitActivePage={filterContext.pagination.currentPage}
        afCurrentResultStart={filterContext.pagination.currentStartValue}
        afCurrentResultEnd={filterContext.pagination.currentEndValue}
        afTotalResults={filterContext.responseData?.hits_returned || 0}
        afResultName="resultat"
        onAfOnPageChange={filterContext.handlePaginationChange}
      ></DigiNavigationPagination>
    </div>
  );
};

export default PaginationBar;
