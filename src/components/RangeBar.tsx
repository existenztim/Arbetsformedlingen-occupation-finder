import { ChangeEvent, useState, useEffect } from 'react';
import { IMatch } from '../models/IMatch';
import '../styles/rangeBar.css';
import { DigiNavigationPagination } from '@digi/arbetsformedlingen-react';
import { DigiNavigationPaginationCustomEvent } from '@digi/arbetsformedlingen/dist/types/components';

interface RangeBarProps {
  responseData: IMatch | undefined;
  onRangeChange: (value: number, value2: number, value3: number) => void;
}

interface IPagination {
  currentPage: number;
  currentStartValue: number;
  currentEndValue: number;
}

const RangeBar = ({ responseData, onRangeChange }: RangeBarProps) => {
  const [rangeValue, setRangeValue] = useState<number>(10);
  const [pagination, setPagination] = useState<IPagination>(
    {
        currentPage: 1,
        currentStartValue: 0,
        currentEndValue: 9,
    });

  const itemsPerPage = 10;
  const totalPages = Math.ceil((responseData?.hits_returned || 0) / itemsPerPage);

  useEffect(() => {
    const newStart = (pagination.currentPage - 1) * itemsPerPage + 1;
    const maxResult = responseData?.hits_returned || 0;
    const newEnd = Math.min(newStart + itemsPerPage - 1, maxResult);

    setPagination((prevPagination) => ({
      ...prevPagination,
      currentStartValue: newStart,
      currentEndValue: newEnd,
    }));
    onRangeChange(rangeValue, newStart, newEnd);
  }, [rangeValue, responseData?.hits_returned, pagination.currentPage]);

  const handleMouseUp = () => {
    onRangeChange(rangeValue, pagination.currentStartValue, pagination.currentEndValue);
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
    <div className="range-container">
      <p>
        Just nu hämtas: {responseData?.hits_returned}/{responseData?.hits_total}
        resultat
      </p>
      <div className="range-bar">
        <label
          htmlFor="rangeInput"
          className="range-value"
        >
          {rangeValue > (responseData?.hits_returned ?? 0)
            ? responseData?.hits_returned ?? 0
            : rangeValue}
        </label>
        <input
          id="rangeInput"
          type="range"
          min="1"
          max={responseData?.hits_total}
          defaultValue={responseData?.hits_returned}
          onMouseUp={handleMouseUp}
          onChange={handleRangeChange}
        />
      </div>
      {totalPages > 1 && (
        <div className="pagination-container">
          <DigiNavigationPagination
            afTotalPages={totalPages}
            afInitActivePage={pagination.currentPage}
            afCurrentResultStart={pagination.currentStartValue}
            afCurrentResultEnd={pagination.currentEndValue}
            afTotalResults={responseData?.hits_returned || 0}
            afResultName="yrken"
            onAfOnPageChange={handlePaginationChange}
          >
          </DigiNavigationPagination>
        </div>
      )}
    </div>
  );
};

export default RangeBar;