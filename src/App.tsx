
import { DigiButton } from '@digi/arbetsformedlingen-react'
import './App.css'
import { postOccupationMatchesByText } from './services/AFservice'

function App() {
  const searchMatches = async () => {
    try {
      const result = await postOccupationMatchesByText("frontend", "utvecklare");
      console.log(result.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
    <h1>TriForce</h1>
   <DigiButton>Tjena</DigiButton>
   <button onClick={searchMatches}>Tjena vanlig knapp</button>
    </>
  )
}

export default App
