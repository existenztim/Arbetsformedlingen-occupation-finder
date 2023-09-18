import axios from "axios";
import { IMatch } from "../models/IMatch";

const baseUrl = 'https://jobed-connect-api.jobtechdev.se/v1/';

//dessa ska skickas som parametrar senare när vi lägger till pagination
const limit = 10; 
const offset = 0;

//POST -> /v1/occupations/match-by-text
//https://jobed-connect-api.jobtechdev.se/v1/occupations/match-by-text?input_text=frontend&input_headline=utvecklare&limit=10&offset=0&include_metadata=false
export const postOccupationMatchesByText = async (input_text:string, input_headline:string) => {
    const response = await axios.post<IMatch>(`
    ${baseUrl}/occupations/match-by-text?input_text=${input_text}&input_headline=${input_headline}&limit=${limit}&offset=${offset}&include_metadata=false
    `)
    return response;
}

//GET -> /v1/enriched_occupations
//https://jobed-connect-api.jobtechdev.se/v1/enriched_occupations?occupation_id=fg7B_yov_smw&include_metadata=true
