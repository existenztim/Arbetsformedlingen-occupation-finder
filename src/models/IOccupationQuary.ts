export interface IOccupationQuery {
    input_text : string,
    input_headline: string,
    limit: number,
    offset: number,
    include_metadata: boolean
}