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
import { FormEvent, useState } from "react";
import { postOccupationMatchesByText } from "../services/AFservice";
import { IMatch } from "../models/IMatch";

interface FormProps {
  onSearch: (result: IMatch) => void;
  onSearchMatch: (response: IMatch) => void;
}

export const Form = ({ onSearch, onSearchMatch }: FormProps) => {
  const initialFormInput = {
    input: "",
    textArea: "",
    error: "",
  };

  const [formInput, setFormInput] = useState(initialFormInput);
  const [loading, setLoading] = useState(false);
  const [inputValidationError, setInputValidationError] = useState("");
  const [formValidationError, setFormValidationError] = useState("");

  const searchMatch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formInput.input.trim() || !formInput.textArea.trim()) {
      setFormValidationError("Båda fälten måste vara ifyllda");
      return; // Don't proceed with the API request
    }

    try {
      setLoading(true);
      const response = await postOccupationMatchesByText({
        input_text: formInput.textArea,
        input_headline: formInput.input,
        limit: 10,
        offset: 0,
        include_metadata: false,
      });
      setFormInput({ ...formInput, error: "" });
      console.log(response);

      onSearch(response);
      onSearchMatch(response);
    } catch (error) {
      setFormInput({
        ...formInput,
        error: "Sökningen misslyckades, försök igen om en stund",
      });
    } finally {
      setLoading(false);
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

    setFormInput({ ...formInput, input: inputValue });
  };

  const handleTextAreaChange = (
    e: DigiFormTextareaCustomEvent<HTMLTextAreaElement>
  ) => {
    const textAreaValue = e.target.value;

    // Clear the form validation error when the user types in the text area
    setFormValidationError("");

    setFormInput({ ...formInput, textArea: textAreaValue });
  };

  return (
    <div className="form-container">
      <form onSubmit={searchMatch}>
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
            value={formInput.input}
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
            value={formInput.textArea}
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
      </form>
      {formInput.error && <div>{formInput.error}</div>}
      {loading && (
        <div className="loader">
          <DigiLoaderSpinner afSize={LoaderSpinnerSize.LARGE} />
        </div>
      )}
    </div>
  );
};
