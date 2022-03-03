import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./search.css";
import "../Admin/admin.css";
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
    fetchZDOptions,
    updateZendeskQuery,
} from '../../Redux/searchSlice';
import SearchResults from "../../Components/SearchResults/searchResults";
import SingleValueSelector from "../../Components/SingleValueSelector/singleValueSelector";
import MultiValueSelector from "../../Components/MultiValueSelector/multiValueSelector";
import ZendeskQuery from "../../Components/ZendeskQuery/zendeskQuery";

function Search() {
    const [currentTab, setCurrentTab] = useState('main');
    const showResults = useSelector((state) => state.search.showResults);
    const isZendesk = useSelector((state) => state.search.isZendesk);
    const isTrello = useSelector((state) => state.search.isTrello);
    const zendeskSearchOptions = useSelector((state) => state.search.zendeskSearchOptions);
    const didFetchOptions = useSelector((state) => state.search.didFetchOptions);
    const articleResults = useSelector((state) => state.search.articleResults);
    const zendeskResults = useSelector((state) => state.search.zendeskResults);
    const trelloResults = useSelector((state) => state.search.trelloResults);
    const searchQuery = useSelector((state) => state.search.searchQuery);
    const zendeskQuery = useSelector((state) => state.search.zendeskQuery);
    const categories = useSelector((state) => state.categories.values);
    const tags = useSelector((state) => state.tags.values);
    const dispatch = useDispatch()

    useEffect(async () => {
        dispatch(fetchCategories());
        dispatch(fetchTags());
        if (!didFetchOptions) {
            dispatch(fetchZDOptions());
        }
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

    const handleClear = () => {
        dispatch(clearSearchQuery());
        setCurrentTab('main');
    }

    const handleZendeskQueryChange = (key, value) => {
        let q = {...zendeskQuery};
        q[key] = value;
        dispatch(updateZendeskQuery(q));
    }

    return (
        <div className="search-container">
            {(isZendesk || isTrello) && !showResults && (
                <div className="admin-subnav">
                    {(isZendesk || isTrello) && <button className={currentTab == 'main' ? "selected" : ""} onClick={() => setCurrentTab('main')}>Main Query</button>}
                    {isZendesk && <button className={currentTab == 'zd' ? "selected" : ""} onClick={() => setCurrentTab('zd')}>Enhance Zendesk Query</button>}
                    {isTrello && <button className={currentTab == 'trello' ? "selected" : ""}onClick={() => setCurrentTab('trello')}>Enhance Trello Query</button>}
                </div>
            )}
        {!showResults && (
            <div className="query">
                {currentTab == 'main' && (
                    <div>
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
                    </div>
                )}
                {currentTab == 'zd' && (
                    <ZendeskQuery
                        options={zendeskSearchOptions}
                        query={zendeskQuery}
                        handleChange={handleZendeskQueryChange}
                    ></ZendeskQuery>
                )}
                <div style={{textAlign: "center"}}>
                    <button className="secondary-button" onClick={handleClear}>Clear</button>
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