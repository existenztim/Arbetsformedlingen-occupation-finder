
import { DigiButton } from '@digi/arbetsformedlingen-react'
import './App.css'
import { getCompetenciesByOccupationId, postOccupationMatchesByText } from './services/AFservice'
import * as AF from '@digi/arbetsformedlingen';

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

  const searchCompetencies = async () => {
    try {
      const result = await getCompetenciesByOccupationId();
      console.log(result.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
    <h1>TriForce</h1>
   <DigiButton 
    afSize={AF.ButtonSize.MEDIUM} afVariation={AF.ButtonVariation.PRIMARY}afFullWidth={false} onClick={searchMatches}>POST occupations - se konsolen för resultat
   </DigiButton>
   <DigiButton 
    afSize={AF.ButtonSize.MEDIUM} afVariation={AF.ButtonVariation.PRIMARY}afFullWidth={false} onClick={searchCompetencies}>GET competencies - se konsolen för resultat
   </DigiButton>
    </>
  )
}

export default App
