import { ChangeEvent, useState, useEffect, createContext } from "react";
import { IMatch } from "../models/IMatch";
import { DigiNavigationPaginationCustomEvent } from "@digi/arbetsformedlingen/dist/types/components";
import { IPagination } from "../models/IPagination";
import PaginationBar from "./PaginationBar";
import RangeBar from "./RangeBar";

interface RangeBarProps {
  responseData: IMatch | undefined;
  onRangeChange: (value: number, startValue: number, endValue: number) => void;
}
interface IFilterContext {
  rangeValue: number;
  pagination: IPagination;
  responseData: IMatch | undefined;
  totalPages: number;
  handleRangeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMouseUp: () => void;
  handlePaginationChange: (
    e: DigiNavigationPaginationCustomEvent<number>
  ) => void;
}
export const FilterContext = createContext<IFilterContext>(
  {} as IFilterContext
);

const FilterContainer = ({ responseData, onRangeChange }: RangeBarProps) => {
  const [rangeValue, setRangeValue] = useState<number>(
    responseData?.hits_returned || 0
  );
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    currentStartValue: 0,
    currentEndValue: 9,
    itemsPerPage: 10,
  });

  const totalPages = Math.ceil(
    (responseData?.hits_returned || 0) / pagination.itemsPerPage
  );

  useEffect(() => {
    const maxResult = responseData?.hits_returned || 0;
    const newStart = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
    const newEnd = Math.min(newStart + pagination.itemsPerPage - 1, maxResult);

    setPagination((prevPagination) => ({
      ...prevPagination,
      currentStartValue: newStart,
      currentEndValue: newEnd,
    }));

    onRangeChange(rangeValue, newStart, newEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeValue, responseData?.hits_returned, pagination.currentPage]);

  const handleMouseUp = () => {
    onRangeChange(
      rangeValue,
      pagination.currentStartValue,
      pagination.currentEndValue
    );
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: 1,
    }));
  };

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(+event.target.value);
  };

  const handlePaginationChange = (
    e: DigiNavigationPaginationCustomEvent<number>
  ) => {
    const newPage = e.detail;
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: newPage,
    }));
  };

  return (
    <>
      <FilterContext.Provider
        value={{
          rangeValue: rangeValue,
          pagination: pagination,
          responseData: responseData,
          totalPages: totalPages,
          handlePaginationChange: handlePaginationChange,
          handleRangeChange: handleRangeChange,
          handleMouseUp: handleMouseUp,
        }}
      >
        <RangeBar></RangeBar>
        {totalPages > 1 && <PaginationBar></PaginationBar>}
      </FilterContext.Provider>
    </>
  );
};

export default FilterContainer;
