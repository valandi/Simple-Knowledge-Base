import { useNavigate } from "react-router-dom";
import ListArticles from "../ListArticles/ListArticles";

export default function SearchResults(props) {
    return (
        <div>
            <ListArticles
                articles={props.searchResults}
            ></ListArticles>
        </div>
    )
        
}