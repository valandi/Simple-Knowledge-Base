export async function generalSearch(data) {
    const req = await fetch('http://localhost:5005/api/saveCategory', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    const res = await req.json();
}