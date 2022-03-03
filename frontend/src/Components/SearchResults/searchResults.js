import { useState } from "react";
import ListArticles from "../ListArticles/ListArticles";
import TrelloResults from "../TrelloResults/trelloResults";
import ZendeskResults from "../ZendeskResults/zendeskResults";

export default function SearchResults(props) {
    const [currentTab, setCurrentTab] = useState("articles");
    return (
        <div>
            <div className="admin-subnav">
                <button className={currentTab == 'articles' ? "selected" : ""} onClick={() => setCurrentTab('articles')}>Articles</button>
                <button className={currentTab == 'zendesk' ? "selected" : ""}onClick={() => setCurrentTab('zendesk')}>Zendesk Tickets</button>
                <button className={currentTab == 'trello' ? "selected" : ""}onClick={() => setCurrentTab('trello')}>Trello Tickets</button>
            </div>
            {currentTab == 'articles' && (
                <div style={{width: "70%", margin: "20px auto"}}>
                    <ListArticles
                        articles={props.searchResults}
                    ></ListArticles>
                </div>
            )}
            {currentTab == 'zendesk' && (
                <div style={{width: "70%", margin: "20px auto"}}>
                    <ZendeskResults
                        tickets={props.tickets}
                    ></ZendeskResults>
                </div>
            )}
            {currentTab == 'trello' && (
                <div style={{width: "70%", margin: "20px auto"}}>
                    <TrelloResults
                        trellos={props.trellos}
                    ></TrelloResults>
                </div>
            )}
        </div>
    )
        
}