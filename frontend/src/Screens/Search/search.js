import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./search.css";
import {
    fetchCategories,
} from '../../Redux/categoriesSlice';
import { 
    fetchTags,
} from "../../Redux/tagsSlice";
import {
    generalSearch,
    updateSearchQuery,
    clearSearchQuery,
    toggleShowResults,
    toggleZendesk,
    toggleTrello,
} from '../../Redux/searchSlice';
import SearchResults from "../../Components/SearchResults/searchResults";
import SingleValueSelector from "../../Components/SingleValueSelector/singleValueSelector";
import MultiValueSelector from "../../Components/MultiValueSelector/multiValueSelector";

function Search() {
    const showResults = useSelector((state) => state.search.showResults);
    const isZendesk = useSelector((state) => state.search.isZendesk);
    const isTrello = useSelector((state) => state.search.isTrello);
    const articleResults = useSelector((state) => state.search.articleResults);
    const zendeskResults = useSelector((state) => state.search.zendeskResults);
    const trelloResults = useSelector((state) => state.search.zendeskResults);
    const searchQuery = useSelector((state) => state.search.searchQuery);
    const categories = useSelector((state) => state.categories.values);
    const tags = useSelector((state) => state.tags.values);
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

    const handleSearchArticles = async () => {
        // TODO: Trigger loading spinner
        await dispatch(generalSearch());
        dispatch(toggleShowResults(true));
    }

    const handleToggleShowResults = (value) => {
        dispatch(toggleShowResults(value));
    }

    const handleRefresh = () => {
        dispatch(generalSearch());
    }

    return (
        <div className="search-container">
        {!showResults && (
            <div className="query">
                <div>
                    <label>Contains Text: </label>
                    <input value={searchQuery.text} onChange={(e) => handleTextChange(e.target.value)} />
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
                <div style={{marginBottom: "20px"}}>
                    <label>Search ZD</label> <input type="checkbox" checked={isZendesk} onChange={() => dispatch(toggleZendesk())}/>
                    <label>Search Trello</label> <input type="checkbox" checked={isTrello} onChange={() => dispatch(toggleTrello())}/>
                </div>
                <div style={{textAlign: "center"}}>
                    <button className="secondary-button" onClick={() => dispatch(clearSearchQuery())}>Clear</button>
                    <button className="main-button" onClick={() => handleSearchArticles()}>Search</button>
                </div>
            </div>
        )}
        {showResults && (
            <div>
                <SearchResults
                    searchResults={articleResults}
                    tickets={zendeskResults}
                    trellos={trelloResults}
                ></SearchResults>
                <button className="secondary-button" onClick={() => handleToggleShowResults(false)}>Back</button>
                <button className="main-button" onClick={() => handleRefresh()}>Refresh Results</button>
            </div>
        )}
        </div>
    )
}

export default Search;