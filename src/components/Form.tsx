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

import { FormEvent, useReducer, useState } from "react";
import { IMatch } from "../models/IMatch";

interface FormProps {
  onSearch: (result: IMatch) => void;
  onSearchMatch: (response: IMatch) => void;
}

interface State {
  headline: string;
  description: string;
  error: string;
  loading: boolean;
  inputValidationError: string;
  formValidationError: string;
}

type Action =
  | {
      type: "changed_headline" | "changed_description" | "set_error";
      payload: string;
      error?: Error;
    }
  | { type: "fetching_data" | "fetched_data"; payload?: boolean };

function reducer(state: State, action: Action): State {
  console.log("Action incoming", action);
  const { type, payload } = action;
  switch (type) {
    case "changed_headline":
      return { ...state, headline: payload };

    case "changed_description":
      return { ...state, description: payload };

    case "set_error":
      return { ...state, error: payload };

    case "fetching_data":
      return { ...state, loading: true, error: "" };

    case "fetched_data":
      return { ...state, loading: false };

    default:
      return state;
  }
}

export const Form = ({ onSearch, onSearchMatch }: FormProps) => {
  const [state, dispatch] = useReducer(reducer, {
    headline: "",
    description: "",
    error: "",
    loading: false,
    inputValidationError: "",
    formValidationError: "",
  });

  const [inputValidationError, setInputValidationError] = useState("");
  const [formValidationError, setFormValidationError] = useState("");

  const searchMatch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.headline.trim() || !state.description.trim()) {
      setFormValidationError("Båda fälten måste vara ifyllda");
      return; // Don't proceed with the API request
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

    // Clear the form validation error when the user types in the input field
    setFormValidationError("");

    // Check if the input is 0
    if (inputValue === "0") {
      setInputValidationError("Input cannot be 0");
    } else {
      setInputValidationError(""); // Clear the input validation error
    }
    dispatch({ type: "changed_headline", payload: inputValue });
    // setFormInput({ ...formInput, input: inputValue });
  };

  const handleTextAreaChange = (
    e: DigiFormTextareaCustomEvent<HTMLTextAreaElement>
  ) => {
    const textAreaValue = e.target.value;

    // Clear the form validation error when the user types in the text area
    setFormValidationError("");
    dispatch({ type: "changed_description", payload: textAreaValue });
    // setFormInput({ ...formInput, textArea: textAreaValue });
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
                inputValidationError || formValidationError
                  ? FormInputValidation.ERROR
                  : FormInputValidation.NEUTRAL
              }
              onAfOnInput={handleInputChange}
              value={state.headline}
              afValidationText={inputValidationError || formValidationError}
            />
            <DigiFormTextarea
              afLabel="Sök på utbildningsbeskrivning"
              afVariation={FormTextareaVariation.MEDIUM}
              afValidation={
                inputValidationError || formValidationError
                  ? FormTextareaValidation.ERROR
                  : FormTextareaValidation.NEUTRAL
              }
              onAfOnInput={handleTextAreaChange}
              value={state.description}
              afValidationText={inputValidationError || formValidationError}
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
