import "../styles/form.css";
import {
  ButtonSize,
  FormInputType,
  FormInputValidation,
  FormInputVariation,
  FormTextareaValidation,
  FormTextareaVariation,
  LoaderSpinnerSize,
} from "@digi/arbetsformedlingen";
import {
  DigiButton,
  DigiFormInput,
  DigiFormTextarea,
  DigiLoaderSpinner,
} from "@digi/arbetsformedlingen-react";
import {
  DigiFormInputCustomEvent,
  DigiFormTextareaCustomEvent,
} from "@digi/arbetsformedlingen/dist/types/components";
import { postOccupationMatchesByText } from "../services/AFservice";

import { FormEvent } from "react";
import { IMatch } from "../models/IMatch";
import { useForm } from "../reducers/formReducer";

interface FormProps {
  onSearch: (result: IMatch) => void;
  onSearchMatch: (response: IMatch) => void;
}

export const Form = ({ onSearch, onSearchMatch }: FormProps) => {
  const [state, dispatch] = useForm();
  const searchMatch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = { headline: "", description: "" };
    if (!state.headline.trim()) {
      validationErrors.headline = "Titel måste fyllas i";
    }
    if (!state.description.trim()) {
      validationErrors.description = "Beskrivning måste fyllas i";
    }
    if (validationErrors.headline || validationErrors.description) {
      dispatch({ type: "failed_validation", payload: validationErrors });
      return;
    }

    try {
      dispatch({ type: "fetching_data" });
      const response = await postOccupationMatchesByText({
        input_text: state.description,
        input_headline: state.headline,
        limit: 100,
        offset: 0,
        include_metadata: false,
      });
      onSearch(response);
      onSearchMatch(response);
    } catch (error) {
      dispatch({
        type: "set_error",
        payload: "Sökningen misslyckades, försök igen om en stund",
      });
    } finally {
      dispatch({ type: "fetched_data" });
    }
  };

  const handleInputChange = (e: DigiFormInputCustomEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toString();
    dispatch({ type: "changed_headline", payload: inputValue });
  };

  const handleTextAreaChange = (
    e: DigiFormTextareaCustomEvent<HTMLTextAreaElement>
  ) => {
    const textAreaValue = e.target.value;
    dispatch({ type: "changed_description", payload: textAreaValue });
  };

  return (
    <div className="form-container">
      <form onSubmit={searchMatch}>
        <div className="form-and-img">
          <div className="form-elements">
            <DigiFormInput
              className="form-input"
              afLabel="Sök på utbildningstitel"
              afVariation={FormInputVariation.MEDIUM}
              afType={FormInputType.TEXT}
              afValidation={
                state.validationErrors.headline
                  ? FormInputValidation.ERROR
                  : FormInputValidation.NEUTRAL
              }
              onAfOnInput={handleInputChange}
              value={state.headline}
              afValidationText={state.validationErrors.headline}
            />
            <DigiFormTextarea
              afLabel="Sök på utbildningsbeskrivning"
              afVariation={FormTextareaVariation.MEDIUM}
              afValidation={
                state.validationErrors.description
                  ? FormTextareaValidation.ERROR
                  : FormTextareaValidation.NEUTRAL
              }
              onAfOnInput={handleTextAreaChange}
              value={state.description}
              afValidationText={state.validationErrors.description}
            />
         
            <DigiButton
              afSize={ButtonSize.LARGE}
              afFullWidth={false}
              afType="submit"
              className="form-button"
            >
              Sök matchande yrken
            </DigiButton>


          </div>
          <div className="img">
            {" "}
            <img src="src/assets/chef-test-img.webp" alt="" />
          </div>
        </div>
      </form>

      {state.error && <div>{state.error}</div>}
      {state.loading && (
        <div className="loader">
          <DigiLoaderSpinner afSize={LoaderSpinnerSize.LARGE} />
        </div>
      )}
    </div>
  );
};
