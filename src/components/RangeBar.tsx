import { ChangeEvent, useState } from 'react'
import { IMatch } from '../models/IMatch'
import '../styles/rangeBar.css'

interface RangeBarProps {
  responseData: IMatch | undefined,
  onRangeChange: (value: number) => void,
}

const RangeBar = (props: RangeBarProps) => {
    const [rangeValue, setRangeValue] = useState<number>(1);

  const handleMouseUp = () => {
    console.log("Range Value:", rangeValue);
    props.onRangeChange(rangeValue); 
  }

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(+event.target.value);
  };

  return (
    <div className="range-container">
      <p>Antal träffar: {props.responseData?.hits_returned}</p>
      <p>Max antal träffar {props.responseData?.hits_total}</p>
      <input
        type="range"
        min="1"
        max="20"
        onMouseUp={handleMouseUp}
        onChange={handleRangeChange}
      />
    </div>
  )
}

export default RangeBar;