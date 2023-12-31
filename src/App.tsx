import { useEffect, useState } from "react";
import { IMatch } from "./models/IMatch";
import "./App.css";
import { Form } from "./components/Form";
import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import FilterContainer from "./components/FilterContainer";
import {} from "@digi/arbetsformedlingen-react";
import NavBar from "./components/NavBar";

function App() {
  const [results, setResults] = useState<IMatch>();
  const [responseData, setResponseData] = useState<IMatch>();
  const [responseInstance, setResponseInstance] = useState(0);
  
  useEffect(() => {
    const targetElement = document.getElementById("anchor-search");
    if (targetElement) {
      targetElement.scrollIntoView();
    }
  }, [results]);

  const onSearch = (incomingResult: IMatch): void => {
    setResults(incomingResult);
  };

  const handleResponse = (data: IMatch): void => {
    setResponseData(data);
    setResponseInstance((prevInstance) => prevInstance + 1);
  };

  const handleRangeChange = (
    value: number,
    startValue: number,
    endValue: number
  ) => {
    if (responseData) {
      setResponseData({ ...responseData, hits_returned: value });
      setResults({
        ...responseData,
        related_occupations: responseData.related_occupations.slice(
          startValue - 1,
          endValue
        ),
      });
    }
  };

  return (
    <>
      <NavBar />
      <Header />
      <Form onSearch={onSearch} onSearchMatch={handleResponse} />
      {responseData && responseData?.hits_total > 0 && (
        <FilterContainer
          key={responseInstance}
          responseData={responseData}
          onRangeChange={handleRangeChange}
        />
      )}
      <div id="anchor-search">
        {results ? <SearchResults result={results} /> : null}
        {results && results?.hits_total < 1 && <p className="no-hit">Inga träffar hittades</p>}
      </div>
      
    </>
  );
}
export default App;
