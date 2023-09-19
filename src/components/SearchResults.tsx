import { IMatch } from '../models/IMatch';
import '../styles/SearchResults.css'

interface SearchResultsProps {
    result: IMatch;
}
const SearchResults = ({ result }: SearchResultsProps) => {

    return (
        <div className='SR-container'>
            <h3>Träffar: {result.hits_returned}</h3>
            <ul className='SR-matches'>
                {result.related_occupations.map((occupation, index) => {
                    if(!occupation.occupation_label) {
                        return <li key={index}>Okänd</li>
                    }
                    return <li key={index}>{occupation.occupation_label}</li>
                })}
            </ul>
        </div>
    )
}

export default SearchResults;