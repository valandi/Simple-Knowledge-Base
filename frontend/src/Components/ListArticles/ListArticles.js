import { useState, useEffect } from "react";
import {
    Link,
  } from "react-router-dom";

function ListArticles(props) {
    
    return (
        <div>
            {props.articles && props.articles.map((article) => {
                return (<p key={article._id}><Link to={"/view-article/" + article._id}>{article.title}</Link></p>)
            })}
        </div>
    )
}

export default ListArticles;