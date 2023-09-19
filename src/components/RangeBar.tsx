import { ChangeEvent, useState } from 'react'
import { IMatch } from '../models/IMatch'
import '../styles/rangeBar.css'

interface RangeBarProps {
  responseData: IMatch | undefined,
  onRangeChange: (value: number) => void,
}

const RangeBar = (props: RangeBarProps) => {
    const [rangeValue, setRangeValue] = useState<number>(10);

  const handleMouseUp = () => {
    console.log("Range Value:", rangeValue);
    props.onRangeChange(rangeValue); 
  }

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(+event.target.value);

  };

  return (
    <div className="range-container">
      <p>Antal visade resultat: {props.responseData?.hits_returned}</p>
      <p>Max antal resultat hittade: {props.responseData?.hits_total}</p>
      <div className="range-bar">
        <p className="range-value">{rangeValue}</p>
        <input
            type="range"
            min="1"
            max="100"
            defaultValue="10"
            onMouseUp={handleMouseUp}
            onChange={handleRangeChange}
        />
      </div>
    </div>    
  )
}

export default RangeBar;