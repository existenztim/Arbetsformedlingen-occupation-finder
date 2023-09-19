import { IMatch } from '../models/IMatch'
import '../styles/rangeBar.css'

interface RangeBarProps {
  responseData: IMatch | undefined
}

const RangeBar = (props: RangeBarProps) => {
  return (
    <div className="range-container">
      <p>Antal träffar: {props.responseData?.hits_returned}</p>
      <p>Max antal träffar {props.responseData?.hits_total}</p>
      <input type="range" min="1" max="20"></input>
    </div>
  )
}

export default RangeBar
