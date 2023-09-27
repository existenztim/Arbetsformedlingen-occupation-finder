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
  handlePaginationChange: (
    e: DigiNavigationPaginationCustomEvent<number>
  ) => void;
}
export const FilterContext = createContext<IFilterContext>(
  {} as IFilterContext
);

const FilterContainer = ({ responseData, onRangeChange }: RangeBarProps) => {
  const [rangeValue, setRangeValue] = useState<number>(Math.min(10, responseData?.hits_total || 0));
  const [pagination, setPagination] = useState<IPagination>({
    //här sätts startvärden för pagineringen
    currentPage: 1, //vilken sida man börjar på
    currentStartValue: 1, //första siffran i "visar 1-10"
    currentEndValue: Math.min(10, responseData?.hits_returned || 0), //väljer det minsta värdet av 9, eller så många resultat vi får tebax, || 0 som dyker upp på flera ställer är bara en backup ifall responseData?.hits_returned är undefined 
    itemsPerPage: 10, //hur många yrken varje sida ska visa.
  });

  const totalPages = Math.ceil( //hur många sidor ska det vara? det avrundar resultatet av responseData?.hits_returned /pagination.itemsPerPage som vi satt till 10, så om responseData?.hits_returned är 20 får vi 2 sidor 
    (responseData?.hits_returned || 0) / pagination.itemsPerPage
  );

  useEffect(() => { //useffektens syfte är dels att updatera pagineringen i setPagination, men även ändra yrkena som renderas i onRangeChange (som körs i app.tsx)
    const maxResult = responseData?.hits_returned || 0;
    const newStart = (pagination.currentPage - 1) * pagination.itemsPerPage + 1; //Gör så startvärdet alltid börjar på 1, eller 11, eller 21 osv. (pagination.currentPage - 1) gör att om vi är på sida 2, blir resultatet 1 sen plussar vi på pagination.itemsPerPage + 1 som blir 11a
    const newEnd = Math.min(newStart + pagination.itemsPerPage - 1, maxResult); 

    setPagination((prevPagination) => ({ //uppdaterar paginerings statet
      ...prevPagination,
      currentStartValue: newStart,
      currentEndValue: newEnd,
    }));

    onRangeChange(rangeValue, newStart, newEnd); //se handleRangeChange  i app.tsx, det uppdaterar resultatet där så SearchResults får rätt info
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeValue, pagination.currentPage]); //den här useeffekten körs om man ändrar värdet på rangebaren, eller byter sida i pagination

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => { //triggas varje gång vi rör rangebaren
    setRangeValue(+event.target.value); //uppdaterar och konverterar statet till number
    // onRangeChange(  //Har kommenterat ut detta, vet ej om det behövs, körs redan i useeffect?
    //   rangeValue,
    //   pagination.currentStartValue,
    //   pagination.currentEndValue
    // );
    setPagination((prevPagination) => ({ //man hamnar automatiskt på sida 1 om man ändrar rangevalue mitt i en sökning
      ...prevPagination,
      currentPage: 1,
    }));
  };

  const handlePaginationChange = (
    e: DigiNavigationPaginationCustomEvent<number>
  ) => {
    const newPage = e.detail; //e.detail är ett number, som är siffran vi befinner oss på, fick forska mig fram till det :P
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
          handleRangeChange: handleRangeChange
        }}
      >
        <RangeBar></RangeBar>
        <PaginationBar></PaginationBar>
      </FilterContext.Provider>
    </>
  );
};

export default FilterContainer;
