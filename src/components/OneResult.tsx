import { IOccupation } from "../models/IOccupation"
import { ICompetenceQuery } from "../models/IQuery";
import { ICompetencies } from "../models/ICompetencies";
import { ICompetenceShort } from "../models/ICompetenceShort";
import { getCompetenciesByOccupationId } from "../services/AFservice"
import { useState } from "react";
import { AxiosResponse } from 'axios';
import {
    DigiLoaderSpinner,
    DigiIconArrowUp,
    DigiIconArrowDown
} from "@digi/arbetsformedlingen-react";
import '../styles/oneResult.css'
import ChartPie from "./ChartPie";



interface OneResultProps {
    occupation: IOccupation;
}



const OneResult = ({ occupation }: OneResultProps) => {
    const [competencies, setCompetencies] = useState<ICompetenceShort[]>();
    const [loading, setLoading] = useState<boolean>();
    const [showChart, setShowChart] = useState<boolean>(false);


    const getReleventCompetencies = (id: string) => {
        if (competencies) {
            return;
        }
        setLoading(true);
        const data: ICompetenceQuery = {
            occupation_id: id,
            include_metadata: true,
        }
        getCompetenciesByOccupationId(data)
            .then((response: AxiosResponse<ICompetencies>) => {
                setLoading(false);
                const fullCompetenciesList = response.data
                const shortCompetenciesList = fullCompetenciesList.metadata.enriched_candidates_term_frequency.competencies.slice(0, 10)
                setCompetencies(shortCompetenciesList)
            })
            .catch((error) => {
                setLoading(false);
                console.log(error)
            })
    };

    const toggleChart = () => {
        setShowChart(!showChart);
    }


    return (
        <>
            <li onClick={() => { getReleventCompetencies(occupation.concept_taxonomy_id); toggleChart(); }} className="position-relative" >
                <div className="oneResult-closed"><h3 className="competencies-header" >{occupation.occupation_label}  {loading && <DigiLoaderSpinner />}</h3>  <button className="open-btn">{showChart ? <DigiIconArrowUp /> : <DigiIconArrowDown />}</button></div>
                {competencies && showChart && <h4>Efterfrågade kompetenser:</h4>}
                <div className="oneResult-main">

                    {competencies && showChart &&

                        <ChartPie chartData={competencies}></ChartPie>
                    }
                </div>
            </li>
        </>
    )
}

export default OneResult;