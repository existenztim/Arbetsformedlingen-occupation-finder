import { DigiButton } from '@digi/arbetsformedlingen-react'
import './App.css'
import { Form } from './components/Form'
import Header from './components/Header'
import RangeBar from './components/RangeBar'
import { getCompetenciesByOccupationId } from './services/AFservice'
import * as AF from '@digi/arbetsformedlingen'
import { useState } from 'react'
import { IMatch } from './models/IMatch'

function App() {
  const [responseData, setResponseData] = useState<IMatch>()

  const handleResponse = (data: IMatch) => {
    setResponseData(data)
  }

  const searchCompetencies = async () => {
    try {
      const result = await getCompetenciesByOccupationId({
        occupation_id: 'fg7B_yov_smw',
        include_metadata: true,
      })
      console.log(result.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <Header />
      <Form onSearchMatch={handleResponse} />
      <RangeBar responseData={responseData}></RangeBar>
      <p>{responseData?.hits_returned}</p>

      <DigiButton
        afSize={AF.ButtonSize.MEDIUM}
        afVariation={AF.ButtonVariation.PRIMARY}
        afFullWidth={false}
        onClick={searchCompetencies}
      >
        GET competencies - se konsolen för resultat
      </DigiButton>
    </>
  )
}

export default App
