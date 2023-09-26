export interface IFormState {
  headline: string;
  description: string;
  error: string;
  loading: boolean;
  validationErrors: {
    headline: string;
    description: string;
  };
}
