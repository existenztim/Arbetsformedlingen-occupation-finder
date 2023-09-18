import axios from "axios";
import { IMatch } from "../models/IMatch";
import { IOccupationQuery } from "../models/IOccupationQuary";
import { ICompetencies } from "../models/ICompetencies";

const baseUrl = 'https://jobed-connect-api.jobtechdev.se/v1/';

//POST -> /v1/occupations/match-by-text
export const postOccupationMatchesByText = async (data:IOccupationQuery) => {
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
export const getCompetenciesByOccupationId = async () => {
    const path = 'enriched_occupations';

    const query = {
        occupation_id: 'fg7B_yov_smw',
        include_metadata: true
    };
    const response = await axios.get<ICompetencies>(`${baseUrl}${path}`, {params: query});
    return response;
}

//https://jobed-connect-api.jobtechdev.se/v1/occupations/match-by-text?input_text=frontend&input_headline=utvecklare&limit=10&offset=0&include_metadata=false
//https://jobed-connect-api.jobtechdev.se/v1/enriched_occupations?occupation_id=fg7B_yov_smw&include_metadata=true