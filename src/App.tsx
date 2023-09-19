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

  const handleRangeChange = (value: number) => {
    if (responseData) {
      setResponseData({ ...responseData, hits_returned: +value });
      console.log("respons",responseData)
      //behöver göra ett api anrop till service?
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