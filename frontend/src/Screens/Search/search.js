import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchCategories,
} from '../../Redux/categoriesSlice';
import { 
    fetchTags,
} from "../../Redux/tagsSlice";
import {
    addArticle,
    deleteArticle,
    editArticle,
    searchArticles,
    updateSearchQuery,
    clearSearchQuery,
} from '../../Redux/articlesSlice';
import SearchResults from "../../Components/SearchResults/searchResults";
import SingleValueSelector from "../../Components/SingleValueSelector/singleValueSelector";
import MultiValueSelector from "../../Components/MultiValueSelector/multiValueSelector";

function Search() {
    const [allTags, setAllTags] = useState([]); 
    const [query, setQuery] = useState({tags: [], category: {name: ""}, text: ""});
    const [showResults, setShowResults] = useState(false);
    const searchResults = useSelector((state) => state.articles.articleSearchResults)
    const searchQuery = useSelector((state) => state.articles.searchQuery)
    const categories = useSelector((state) => state.categories.values)
    const tags = useSelector((state) => state.tags.values)
    const dispatch = useDispatch()

    useEffect(async () => {
        dispatch(fetchCategories());
        dispatch(fetchTags());
    }, [])

    const handleCategoryChange = (value) => {
        let q = {...searchQuery};
        q['category'] = value;
        dispatch(updateSearchQuery(q));
    }

    const handleTagChange = (value) => {
        let q = {...searchQuery};
        q['tags'] = value;
        dispatch(updateSearchQuery(q));
    }

    const handleTextChange = (value) => {
        let q = {...searchQuery};
        q['text'] = value;
        dispatch(updateSearchQuery(q));
    }

    const handleSearchArticles = () => {
        dispatch(searchArticles(searchQuery));
        setShowResults(true);
    }

    return (
        <div>
        {!showResults && (
            <div>
                <div>
                    <label>Contains Text: </label>
                    <input value={searchQuery.text} onChange={(e) => handleTextChange(e.target.value)}/>
                </div>
                <SingleValueSelector
                    options={categories}
                    label="Select Category"
                    displayField="name"
                    onValueChange={handleCategoryChange}
                    initialValue={searchQuery.category}
                ></SingleValueSelector>
                <MultiValueSelector
                    options={tags}
                    label="Select Tags"
                    displayField="name"
                    onValueChange={handleTagChange}
                    initialValue={searchQuery.tags}
                ></MultiValueSelector>
                <button onClick={() => handleSearchArticles()}>Search</button>
                <button onClick={() => dispatch(clearSearchQuery())}>Clear</button>
            </div>
        )}
        {showResults && (
            <div>
                {console.log(searchResults)}
                <SearchResults
                    searchResults={searchResults}
                ></SearchResults>
                <button onClick={() => setShowResults(false)}>Back</button>
            </div>
        )}
        </div>
    )
}

export default Search;