import { useEffect, useState } from "react"
import ListArticles from "../ListArticles/ListArticles";

export default function SearchResults(props) {
    return (
        <ListArticles
            articles={props.searchResults}
        ></ListArticles>
    )
}