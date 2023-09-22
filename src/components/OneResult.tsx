import { IOccupation } from "../models/IOccupation"
import { ICompetenceQuery } from "../models/IQuery";
import { ICompetencies } from "../models/ICompetencies";
import { getCompetenciesByOccupationId } from "../services/AFservice"
import { useState } from "react";
import { AxiosResponse } from 'axios';

interface OneResultProps {
    occupation: IOccupation;
}

const OneResult = ({ occupation }: OneResultProps) => {
    const [competencies, setCompetencies] = useState<ICompetencies>();

    const getReleventCompetencies = (id: string) => {
        const data: ICompetenceQuery = { 
            occupation_id: id,
            include_metadata: true,
        }
        getCompetenciesByOccupationId(data)
        .then((response: AxiosResponse<ICompetencies>) => {
            setCompetencies(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    };

    

    return (
        <li onClick={() => getReleventCompetencies(occupation.concept_taxonomy_id)}>   {occupation.occupation_label}
        { competencies &&
        <ul>  
            {
                competencies.metadata.enriched_candidates_term_frequency.competencies.slice(0, 10).map((competence, index) => {
                    return <li key={index}> -- {competence.term} -- %{competence.percent_for_occupation}</li>
                })
            }
        </ul>
        }
        </li>
    )
}

export default OneResult;