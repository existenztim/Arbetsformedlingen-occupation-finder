import { ChangeEvent, useState } from 'react';
import { IMatch } from '../models/IMatch';
import '../styles/rangeBar.css';
import { DigiNavigationPagination } from '@digi/arbetsformedlingen-react';
import { DigiNavigationPaginationCustomEvent } from '@digi/arbetsformedlingen/dist/types/components';

interface RangeBarProps {
  responseData: IMatch | undefined;
  onRangeChange: (value: number) => void;
}

const RangeBar = ({ responseData, onRangeChange }: RangeBarProps) => {
  const [rangeValue, setRangeValue] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil((responseData?.hits_returned || 0) / itemsPerPage);

  const handleMouseUp = () => {
    onRangeChange(rangeValue);
  };

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(+event.target.value);
  };

  const handlePaginationChange = (e: DigiNavigationPaginationCustomEvent<number>) => {
    const newPage = e.detail;
    setCurrentPage(newPage); 
  };

  const calculateCurrentResultStart = () => {
    return (currentPage - 1) * itemsPerPage + 1;
  };
  
  const calculateCurrentResultEnd = () => {
    const start = calculateCurrentResultStart();
    const end = start + itemsPerPage - 1;
    const maxResult = responseData?.hits_returned || 0;
    
    return Math.min(end, maxResult);
  };

  return (
    <div className="range-container">
      <p>Just nu visas: {responseData?.hits_returned}/{responseData?.hits_total} resultat</p>
      <div className="range-bar">
        <p className="range-value">{rangeValue > (responseData?.hits_returned ?? 0) ? (responseData?.hits_returned ?? 0) : rangeValue}</p>
        <input
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
            afInitActivePage={currentPage}
            afCurrentResultStart={calculateCurrentResultStart()}
            afCurrentResultEnd={calculateCurrentResultEnd()}
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