import { IOccupation } from "../models/IOccupation"


interface OneResultProps {
    occupation: IOccupation
}

const OneResult = ({ occupation }: OneResultProps) => {
    return (
        <li> {occupation.occupation_label}</li>
    )
}

export default OneResult;