import { IOccupation } from "./IOccupation";

export interface IMatch {
  hits_total: number;
  hits_returned: number;
  identified_keywords_for_input: {
    competencies: string[];
    occupations: string[];
  };
  related_occupations: IOccupation[];
}
