import './App.css'
import { Form } from './components/Form'
import Header from './components/Header'
import RangeBar from './components/RangeBar'
import { useState } from 'react'
import { IMatch } from './models/IMatch'

function App() {
  const [responseData, setResponseData] = useState<IMatch>()

  const handleResponse = (data: IMatch) => {
    setResponseData(data)
  }

  const handleRangeChange = (value: number) => {
    if (responseData) {
      setResponseData({ ...responseData, hits_returned: +value });
    }
  }

  return (
    <>
      <Header />
      <Form onSearchMatch={handleResponse} />
      {responseData && (<RangeBar responseData={responseData} onRangeChange={handleRangeChange} />)}
    </>
  )
}

export default App;