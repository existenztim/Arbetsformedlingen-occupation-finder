
import { DigiButton } from '@digi/arbetsformedlingen-react'
import './App.css'
import { postOccupationMatchesByText } from './services/AFservice'

function App() {
  const searchMatches = async () => {
    try {
      const result = await postOccupationMatchesByText({
        input_text: "frontend", 
        input_headline: "utvecklare", 
        limit: 10, 
        offset: 0, 
        include_metadata: false});

      console.log(result.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
    <h1>TriForce</h1>
   <DigiButton onClick={searchMatches}>POST - se konsolen för resultat</DigiButton>
    </>
  )
}

export default App
