import '../styles/form.css';
import {
  ButtonSize,
  FormInputType,
  FormInputValidation,
  FormInputVariation,
  FormTextareaValidation,
  FormTextareaVariation,
  LoaderSpinnerSize,
} from '@digi/arbetsformedlingen';
import {
  DigiButton,
  DigiFormInput,
  DigiFormTextarea,
  DigiLoaderSpinner,
} from '@digi/arbetsformedlingen-react';
import {
  DigiFormInputCustomEvent,
  DigiFormTextareaCustomEvent,
} from "@digi/arbetsformedlingen/dist/types/components";
import { FormEvent, useState } from "react";
import { postOccupationMatchesByText } from "../services/AFservice";
import { IMatch } from "../models/IMatch";

interface FormProps {
  onSearch: (result: IMatch) => void;
  onSearchMatch: (response: IMatch) => void;
}

export const Form = ( { onSearch, onSearchMatch }: FormProps) => {

 const initialFormInput = {
    input: '',
    textArea: '',
    error: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);
  const [loading, setLoading] = useState(false);

  const searchMatch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await postOccupationMatchesByText({
        input_text: formInput.textArea,
        input_headline: formInput.input,
        limit: 100,
        offset: 0,
        include_metadata: false,
      });
      setFormInput({ ...formInput, error: '' });
      console.log(response);

      onSearch(response);

      onSearchMatch(response);

    } catch (error) {
      setFormInput({ ...formInput, error: `Sökningen misslyckades med felmeddelande : ${error}` });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: DigiFormInputCustomEvent<HTMLInputElement>) => {
    setFormInput({ ...formInput, input: e.target.value.toString() });
  };

  const handleTextAreaChange = (
    e: DigiFormTextareaCustomEvent<HTMLTextAreaElement>
  ) => {
    setFormInput({ ...formInput, textArea: e.target.value });
  };

  return (
    <div className="form-container">
      <form onSubmit={searchMatch}>
        <DigiFormInput
          className="form-input"
          afLabel="Sök på utbildningstitel"
          afVariation={FormInputVariation.MEDIUM}
          afType={FormInputType.TEXT}
          afValidation={FormInputValidation.NEUTRAL}
          onAfOnInput={handleInputChange}
          value={formInput.input}
        ></DigiFormInput>
        <DigiFormTextarea
          afLabel="Sök på utbildningsbeskrivning"
          afVariation={FormTextareaVariation.MEDIUM}
          afValidation={FormTextareaValidation.NEUTRAL}
          onAfOnInput={handleTextAreaChange}
          value={formInput.textArea}
        ></DigiFormTextarea>
        <DigiButton
          afSize={ButtonSize.LARGE}
          afFullWidth={false}
          afType="submit"
          className="form-button"
        >
          Sök matchande yrken
        </DigiButton>
      </form>
      {formInput.error && <div>{formInput.error}</div>}
      {loading && <div className="loader"><DigiLoaderSpinner afSize={LoaderSpinnerSize.LARGE} /></div>}
    </div>
  )
};
