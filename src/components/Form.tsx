import '../styles/form.css'
import {
  ButtonSize,
  FormInputType,
  FormInputValidation,
  FormInputVariation,
  FormTextareaValidation,
  FormTextareaVariation,
  LoaderSpinnerSize,
} from '@digi/arbetsformedlingen'
import {
  DigiButton,
  DigiFormInput,
  DigiFormTextarea,
  DigiLoaderSpinner,
} from '@digi/arbetsformedlingen-react'
import {
  DigiFormInputCustomEvent,
  DigiFormTextareaCustomEvent,
} from '@digi/arbetsformedlingen/dist/types/components'
import { FormEvent, useState } from 'react'
import { postOccupationMatchesByText } from '../services/AFservice'
import { IMatch } from '../models/IMatch'

interface ChildProps {
  onSearchMatch: (response: IMatch) => void // Define the type for the callback function
}

export const Form = (props: ChildProps) => {
  const [input, setInput] = useState('')
  const [textArea, setTextArea] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  const searchMatch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true);
      const response = await postOccupationMatchesByText({
        input_text: textArea,
        input_headline: input,
        limit: 10,
        offset: 0,
        include_metadata: false,
      })
      setError('')
      console.log(response)
      props.onSearchMatch(response)
    } catch (error) {
      setError('Sökningen misslyckades försök igen')
    } finally {
      setLoading(false); 
    }
  }

  const handleInputChange = (e: DigiFormInputCustomEvent<HTMLInputElement>) => {
    setInput(e.target.value.toString())
  }

  const handleTextAreaChange = (
    e: DigiFormTextareaCustomEvent<HTMLTextAreaElement>
  ) => {
    setTextArea(e.target.value)
  }

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
      {loading && <div className="loader"><DigiLoaderSpinner afSize={LoaderSpinnerSize.LARGE} /></div>} {/* Conditionally render the loader */}
    </div>
  )
}
