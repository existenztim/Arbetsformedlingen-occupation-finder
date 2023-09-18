export interface IMatchQuery {
    input_text : string,
    input_headline: string,
    limit: number,
    offset: number,
    include_metadata: boolean
}

export interface ICompetenceQuery {
    occupation_id: string,
    include_metadata: boolean
}