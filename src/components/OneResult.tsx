import { IOccupation } from "../models/IOccupation"
import { ICompetenceQuery } from "../models/IQuery";
import { ICompetencies } from "../models/ICompetencies";
import { getCompetenciesByOccupationId } from "../services/AFservice"
import { useState } from "react";
import { AxiosResponse } from 'axios';
import {
    DigiButton,
    DigiLoaderSpinner,
    DigiIconArrowUp
} from "@digi/arbetsformedlingen-react";
import '../styles/oneResult.css'



interface OneResultProps {
    occupation: IOccupation;
}

const OneResult = ({ occupation }: OneResultProps) => {
    const [competencies, setCompetencies] = useState<ICompetencies>();
    const [loading, setLoading] = useState<Boolean>();

    const getReleventCompetencies = (id: string) => {
        setLoading(true);
        const data: ICompetenceQuery = {
            occupation_id: id,
            include_metadata: true,
        }
        getCompetenciesByOccupationId(data)
            .then((response: AxiosResponse<ICompetencies>) => {
                setLoading(false);
                setCompetencies(response.data)
            })
            .catch((error) => {
                setLoading(false);
                console.log(error)
            })
    };

    const handleCloseBtnClick = () => {
        setCompetencies(undefined)
    }


    return (
        <>
            <li className="position-relative" >   
                <h3 className="competencies-header" onClick={() => getReleventCompetencies(occupation.concept_taxonomy_id)}>{occupation.occupation_label}</h3>
                {loading &&  <div className="loading-competencies"><DigiLoaderSpinner></DigiLoaderSpinner></div>}
                {competencies &&
                    <ul>
                        {
                            competencies.metadata.enriched_candidates_term_frequency.competencies.slice(0, 10).map((competence, index) => {
                                return <li key={index}> -- {competence.term} -- %{competence.percent_for_occupation}</li>
                            })
                        }
                    </ul>
                }
                {competencies && <button onClick={() => handleCloseBtnClick()} className="close-btn"><DigiIconArrowUp></DigiIconArrowUp></button>}
            </li>
        </>
    )
}

export default OneResult;