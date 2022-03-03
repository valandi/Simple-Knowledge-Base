import { useState } from "react";
import ListArticles from "../ListArticles/ListArticles";

export default function SearchResults(props) {
    const [currentTab, setCurrentTab] = useState("articles");
    return (
        <div>
            {console.log(props.searchResults)}
            <div className="admin-subnav">
                <button className={currentTab == 'articles' ? "selected" : ""} onClick={() => setCurrentTab('articles')}>Articles</button>
                <button className={currentTab == 'zendesk' ? "selected" : ""}onClick={() => setCurrentTab('zendesk')}>Zendesk Tickets</button>
                <button className={currentTab == 'trello' ? "selected" : ""}onClick={() => setCurrentTab('trello')}>Trello Tickets</button>
            </div>
            <div style={{width: "70%", margin: "20px auto"}}>
                <ListArticles
                    articles={props.searchResults}
                ></ListArticles>
            </div>
        </div>
    )
        
}