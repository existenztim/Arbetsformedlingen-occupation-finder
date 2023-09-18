import "../styles/form.css";
import {
  ButtonSize,
  FormInputType,
  FormInputValidation,
  FormInputVariation,
  FormTextareaValidation,
  FormTextareaVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiButton,
  DigiFormInput,
  DigiFormTextarea,
} from "@digi/arbetsformedlingen-react";
import {
  DigiFormInputCustomEvent,
  DigiFormTextareaCustomEvent,
} from "@digi/arbetsformedlingen/dist/types/components";
import { FormEvent, useState } from "react";
import { postOccupationMatchesByText } from "../services/AFservice";

export const Form = () => {
  const [input, setInput] = useState("");
  const [textArea, setTextArea] = useState("");
  const [error, setError] = useState("");

  const searchMatch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await postOccupationMatchesByText({
        input_text: input,
        input_headline: textArea,
        limit: 10,
        offset: 0,
        include_metadata: false,
      });
      setError("");
      console.log(response);
    } catch (error) {
      setError("Sökningen misslyckades försök igen");
    }
  };

  const handleInputChange = (e: DigiFormInputCustomEvent<HTMLInputElement>) => {
    setInput(e.target.value.toString());
  };

  const handleTextAreaChange = (
    e: DigiFormTextareaCustomEvent<HTMLTextAreaElement>
  ) => {
    setTextArea(e.target.value);
  };

  return (
    <div className="form-container">
      <form onSubmit={searchMatch}>
        <DigiFormInput
          className="form-input"
          afLabel="sök på utbildningstitel"
          afVariation={FormInputVariation.MEDIUM}
          afType={FormInputType.TEXT}
          afValidation={FormInputValidation.NEUTRAL}
          onAfOnInput={handleInputChange}
          value={input}
        ></DigiFormInput>
        <DigiFormTextarea
          afLabel="sök på utbildningsbeskrivning"
          afVariation={FormTextareaVariation.MEDIUM}
          afValidation={FormTextareaValidation.NEUTRAL}
          onAfOnInput={handleTextAreaChange}
          value={textArea}
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

      {error ? <div>{error}</div> : <div>resultat</div>}
    </div>
  );
};
