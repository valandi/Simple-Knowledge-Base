import {
    Link,
} from "react-router-dom";
import "./ListArticles.css";

function ListArticles(props) {
    
    return (
        <div>
            <table className="list-articles-table">
                <thead>
                    <tr>
                        <th>Article</th>
                        <th>Category</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                        {props.articles && props.articles.map((article, index) => {
                            return (
                                <tr key={article._id} className={index % 2 == 0 ? "dark" : ""}>
                                    <td key={"link" + article._id}>
                                        <Link to={"/view-article/" + article._id}>{article.title}</Link>
                                    </td>
                                    <td key={"category" + article._id}>
                                        {article.category && article.category.name}
                                    </td>
                                    <td key={"tags" + article._id}>
                                        <div className="selected-options">
                                            {article.tags && article.tags.map((value, index) => {
                                                return <span key={index}>{value['name']}, </span>
                                            })}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            
        </div>
    )
}

export default ListArticles;