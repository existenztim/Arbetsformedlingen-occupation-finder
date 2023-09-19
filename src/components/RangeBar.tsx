import { ChangeEvent, useState } from 'react';
import { IMatch } from '../models/IMatch';
import '../styles/rangeBar.css';

interface RangeBarProps {
  responseData: IMatch | undefined;
  onRangeChange: (value: number) => void;
}

const RangeBar = ({ responseData, onRangeChange }: RangeBarProps) => {
  const [rangeValue, setRangeValue] = useState<number>(10);

  const handleMouseUp = () => {
    console.log("Range Value:", rangeValue);
    onRangeChange(rangeValue);
  };

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(+event.target.value);
  };

  return (
    <div className="range-container">
      <p>Just nu visas: {responseData?.hits_returned}/{responseData?.hits_total} resultat</p>
      <div className="range-bar">
        <p className="range-value">{rangeValue}</p>
        <input
          type="range"
          min="1"
          max={responseData?.hits_total}
          defaultValue={responseData?.hits_returned}
          onMouseUp={handleMouseUp}
          onChange={handleRangeChange}
        />
      </div>
    </div>
  );
};

export default RangeBar;