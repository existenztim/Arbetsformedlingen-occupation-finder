import axios from "axios";
import { IMatch } from "../models/IMatch";
import { ICompetenceQuery, IMatchQuery } from "../models/IQuery";
import { ICompetencies } from "../models/ICompetencies";

const baseUrl = 'https://jobed-connect-api.jobtechdev.se/v1/';

//POST -> /v1/occupations/match-by-text
export const postOccupationMatchesByText = async (data:IMatchQuery) => {
    const path = 'occupations/match-by-text';
    
    const query = {
      input_text: data.input_text,
      input_headline: data.input_headline,
      limit: data.limit,
      offset: data.offset,
      include_metadata: data.include_metadata
    };

      const response = await axios.post<IMatch>(`${baseUrl}${path}`, query);
      return response;
  };

//GET -> /v1/enriched_occupations
export const getCompetenciesByOccupationId = async (data:ICompetenceQuery) => {
    const path = 'enriched_occupations';

    const query = {
        occupation_id: data.occupation_id,
        include_metadata: data.include_metadata
    };

    const response = await axios.get<ICompetencies>(`${baseUrl}${path}`, {params: query});
    return response;
}