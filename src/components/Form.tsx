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

export const Form = () => {
  const [input, setInput] = useState("");
  const [textArea, setTextArea] = useState("");

  const searchMatch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (e: DigiFormInputCustomEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInput(e.target.value.toString());
  };

  const handleTextAreaChange = (
    e: DigiFormTextareaCustomEvent<HTMLTextAreaElement>
  ) => {
    setTextArea(e.target.value);
    console.log(e.target.value);
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
    </div>
  );
};
