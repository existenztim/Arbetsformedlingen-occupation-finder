import {
  ButtonSize,
  ButtonVariation,
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

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
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
    <div>
      <form onSubmit={handleSearch}>
        <DigiFormInput
          afLabel="Etikett"
          afVariation={FormInputVariation.MEDIUM}
          afType={FormInputType.TEXT}
          afValidation={FormInputValidation.NEUTRAL}
          onAfOnInput={handleInputChange}
          value={input}
        ></DigiFormInput>
        <DigiFormTextarea
          afLabel="Etikett"
          afVariation={FormTextareaVariation.MEDIUM}
          afValidation={FormTextareaValidation.NEUTRAL}
          onAfOnInput={handleTextAreaChange}
          value={textArea}
        ></DigiFormTextarea>
        <DigiButton
          afSize={ButtonSize.LARGE}
          afVariation={ButtonVariation.PRIMARY}
          afFullWidth={false}
          afType="submit"
        >
          Sök matchande yrken
        </DigiButton>
      </form>
    </div>
  );
};
