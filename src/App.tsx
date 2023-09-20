import { useState } from 'react'
import { IMatch } from './models/IMatch'
import './App.css'
import { Form } from './components/Form'
import Header from './components/Header'
import  SearchResults  from './components/SearchResults'
import RangeBar from './components/RangeBar'
        
function App() {

  const [results, setResults] = useState<IMatch>();
  const [responseData, setResponseData] = useState<IMatch>();
  
  const onSearch = (incomingResult: IMatch): void => {
    setResults(incomingResult)
  }

  const handleResponse = (data: IMatch) => {
    setResponseData(data)
  }

  const handleRangeChange = (value: number, value2: number, value3: number) => {
    console.log("i parent:",value2, value3)
    if (responseData) {
      setResponseData({ ...responseData, hits_returned: +value });
      setResults({
        ...responseData,
        related_occupations: responseData.related_occupations.slice(value2, value3)
 
      });      
      console.log(results?.related_occupations)
    }
  }

  return (
    <>
      <Header />
      <Form onSearch={onSearch} onSearchMatch={handleResponse}/>
      {responseData && (<RangeBar responseData={responseData} onRangeChange={handleRangeChange} />)}
      {results ? <SearchResults result={results} /> : null} 
    </>
  )
}

export default App;