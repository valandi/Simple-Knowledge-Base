export async function fetchArticlesAsync() {
    const req = await fetch('http://localhost:5005/api/getArticles'); 
    const res = await req.json();
    return res; 
}

export async function addArticleAsync(article) {
    const req = await fetch('http://localhost:5005/api/saveArticle', {
        method: "POST", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article),
    });
    const res = await req.json();
    return res; 
}

export async function editArticleAsync(article) {
    await fetch('http://localhost:5005/api/editArticle', {
        method: "PUT", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article),
    });
}

export async function deleteArticleAsync(id) {
    await fetch('http://localhost:5005/api/deleteArticle/'+id, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
}

export async function searchArticlesAsync(query) {
    const req = await fetch('http://localhost:5005/api/searchArticles', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query),
    })
    const res = await req.json();
    return res.data;
}

export async function getArticleAsync(id) {
    const req = await fetch('http://localhost:5005/api/getArticle/'+id);
    const res = await req.json();
    return res.data;
}