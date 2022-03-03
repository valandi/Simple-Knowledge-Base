import "../ListArticles/ListArticles.css";

export default function ZendeskResults(props) {
    return (
        <div className="results-container">
            <table className="search-results-table">
                <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>Subject</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                        {props.tickets && props.tickets.map((ticket, index) => {
                            return (
                                <tr key={ticket.id} className={index % 2 == 0 ? "dark" : ""}>
                                    <td key={"id" + ticket.id}>
                                        {ticket.id}
                                    </td>
                                    <td key={"subject" + ticket.id} className="limit-width">
                                        {ticket.subject}
                                    </td>
                                    <td key={"link" + ticket.id}>
                                        <a href={ticket.url} target="_blank">{ticket.url}</a>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}