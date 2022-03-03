import "../ListArticles/ListArticles.css";

export default function TrelloResults(props) {
    return (
        <div className="results-container">
            <table className="search-results-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                        {props.trellos && props.trellos.map((trello, index) => {
                            return (
                                <tr key={index} className={index % 2 == 0 ? "dark" : ""}>
                                    <td key={"title" + index} style={{width: "70%"}}>
                                        {trello.title}
                                    </td>
                                    <td key={"url" + index}>
                                        <a href={trello.url} target="_blank">{trello.url}</a>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}