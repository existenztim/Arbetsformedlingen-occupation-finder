import { ICompetenceShort } from './ICompetenceShort';
export interface ICompetencies {
  id: string;
  occupation_label: string;
  concept_taxonomy_id: string;
  legacy_ams_taxonomy_id: string;
  occupation_group: {
    occupation_group_label: string;
    concept_taxonomy_id: string;
    ssyk: string;
  };
  metadata: {
    enriched_ads_count: number;
    enriched_ads_total_count: number;
    enriched_ads_percent_of_total: number;
    enriched_candidates_term_frequency: {
      competencies: ICompetenceShort[];
    };
  };
}

